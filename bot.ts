// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Composer } from "./composer.ts";
import { Context } from "./context.ts";
import { Telegram } from "./telegram.ts";
import { WebhookServer } from "./webhook_server.ts";
import { Update, GetUpdatesParameters, SetWebhookParameters } from "./types.ts";
import { logger } from "./_util/mod.ts";

/** Polling options */
export type PollingOptions = GetUpdatesParameters;

/** Webhook options */
export interface WebhookOptions extends SetWebhookParameters {
  port: number;
}

/** Launch options */
export interface LaunchOptions {
  polling?: PollingOptions;
  webhook?: WebhookOptions;
}

/** Start polling options */
export type StartPollingOptions = Omit<PollingOptions, "offset">;

/** Start webhook options */
export type StartWebhookOptions = Omit<WebhookOptions, "url">;

/** Telegram bot */
export class Bot extends Composer<Context> {
  private readonly _polling = {
    offset: 0,
    limit: 100,
    timeout: 30,
    allowedUpdates: [] as string[],
    started: false,
  };
  private _webhookServer?: WebhookServer;

  private readonly _telegram: Telegram;

  private _context?: Context;

  constructor(private readonly _token: string) {
    super();

    this._telegram = new Telegram(this._token);
  }

  /** Handle update */
  private _handleUpdate(update: Update): void {
    logger.info(`Processing update ${update.update_id}`);

    this._context = new Context(update, this._telegram);
    this.middleware(this._context, async () => {});
  }

  /** Handle updates */
  private _handleUpdates(updates: Update[]): void {
    updates.forEach(this._handleUpdate.bind(this));
  }

  /** Fetch updates */
  private async _fetchUpdates(): Promise<void> {
    if (!this._polling.started) {
      return;
    }

    const _updates = await this._telegram.getUpdates({
      offset: this._polling.offset,
      limit: this._polling.limit,
      timeout: this._polling.timeout,
      allowedUpdates: this._polling.allowedUpdates,
    });

    this._handleUpdates(_updates);

    if (_updates.length > 0) {
      this._polling.offset = _updates[_updates.length - 1].update_id + 1;
    }

    this._fetchUpdates();
  }

  /** Start polling */
  private async _startPolling(
    offset?: number,
    options?: StartPollingOptions,
  ): Promise<void> {
    if (offset !== undefined) {
      this._polling.offset = offset;
    }

    if (options !== undefined) {
      this._polling.limit = options.limit;
      this._polling.timeout = options.timeout;
      this._polling.allowedUpdates = options.allowedUpdates;
    }

    if (!this._polling.started) {
      this._polling.started = true;
      this._fetchUpdates();
    }
  }

  /** Start webhook */
  private async _startWebhook(
    url: string,
    options: StartWebhookOptions,
  ): Promise<void> {
    const { port, ...restOptions } = options;

    await this._telegram.setWebhook({
      url,
      ...restOptions,
    });

    this._webhookServer = new WebhookServer({
      url,
      handler: this._handleUpdate.bind(this),
    });
    this._webhookServer.listen(port);
  }

  /** Launch bot */
  public async launch(options?: LaunchOptions): Promise<void> {
    logger.info("Connecting to Telegram");

    const botInfo = await this._telegram.getMe();

    logger.info(`Launching ${botInfo.username}`);

    // Long polling
    if (options?.webhook === undefined) {
      await this._telegram.deleteWebhook();

      const { offset, limit, timeout, allowedUpdates } = options?.polling || {};

      await this._startPolling(offset, {
        limit: limit || this._polling.limit,
        timeout: timeout || this._polling.timeout,
        allowedUpdates: allowedUpdates || this._polling.allowedUpdates,
      });

      logger.info(`Bot started with long polling`);

      return;
    }

    // Webhooks
    const { url, ...restOptions } = options.webhook;

    await this._startWebhook(url, restOptions);

    const host = new URL(url).host;
    logger.info(`Bot started with webhook @ ${host}`);
  }

  /** Stop bot */
  public async stop(): Promise<void> {
    logger.info("Stopping bot");

    if (this._webhookServer !== undefined) {
      return this._webhookServer.close();
    }

    this._polling.started = false;
  }
}
