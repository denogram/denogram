// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { Composer } from "./composer.ts";
import { Context, State } from "./context.ts";
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
export class Bot extends Composer<Context<State>> {
  readonly #polling = {
    offset: 0,
    limit: 100,
    timeout: 30,
    allowedUpdates: [] as string[],
    started: false,
  };
  #webhookServer?: WebhookServer;
  readonly #telegram: Telegram;
  #context?: Context<State>;

  constructor(readonly token: string) {
    super();

    this.#telegram = new Telegram(this.token);
  }

  /** Handle update */
  #handleUpdate = async (update: Update): Promise<void> => {
    logger.info(`Processing update ${update.update_id}`);

    this.#context = new Context(update, this.#telegram);
    this.#context.me = await this.#telegram.getMe();
    this.middleware(this.#context, async () => {});
  };

  /** Handle updates */
  #handleUpdates = (updates: Update[]): void => {
    updates.forEach(this.#handleUpdate.bind(this));
  };

  /** Fetch updates */
  #fetchUpdates = async (): Promise<void> => {
    if (!this.#polling.started) {
      return;
    }

    const _updates = await this.#telegram.getUpdates({
      offset: this.#polling.offset,
      limit: this.#polling.limit,
      timeout: this.#polling.timeout,
      allowedUpdates: this.#polling.allowedUpdates,
    });

    this.#handleUpdates(_updates);

    if (_updates.length > 0) {
      this.#polling.offset = _updates[_updates.length - 1].update_id + 1;
    }

    this.#fetchUpdates();
  };

  /** Start polling */
  #startPolling = async (
    offset?: number,
    options?: StartPollingOptions,
  ): Promise<void> => {
    if (offset !== undefined) {
      this.#polling.offset = offset;
    }

    if (options !== undefined) {
      this.#polling.limit = options.limit;
      this.#polling.timeout = options.timeout;
      this.#polling.allowedUpdates = options.allowedUpdates;
    }

    if (!this.#polling.started) {
      this.#polling.started = true;
      this.#fetchUpdates();
    }
  };

  /** Start webhook */
  #startWebhook = async (
    url: string,
    options: StartWebhookOptions,
  ): Promise<void> => {
    const { port, ...rest } = options;

    await this.#telegram.setWebhook({
      url,
      ...rest,
    });

    this.#webhookServer = new WebhookServer({
      url,
      handler: this.#handleUpdate.bind(this),
    });
    this.#webhookServer.listen(port);
  };

  /** Launch bot */
  async launch(options?: LaunchOptions): Promise<void> {
    logger.info("Connecting to Telegram");

    const botInfo = await this.#telegram.getMe();
    logger.info(`Launching ${botInfo.username}`);

    // Long polling
    if (options?.webhook === undefined) {
      await this.#telegram.deleteWebhook();

      const { offset, limit, timeout, allowedUpdates } = options?.polling || {};

      await this.#startPolling(offset, {
        limit: limit || this.#polling.limit,
        timeout: timeout || this.#polling.timeout,
        allowedUpdates: allowedUpdates || this.#polling.allowedUpdates,
      });

      logger.info(`Bot started with long polling`);

      return;
    }

    // Webhooks
    const { url, ...rest } = options.webhook;

    await this.#startWebhook(url, rest);

    const host = new URL(url).host;
    logger.info(`Bot started with webhook @ ${host}`);
  }

  /** Stop bot */
  async stop(): Promise<void> {
    logger.info("Stopping bot");

    if (this.#webhookServer !== undefined) {
      return this.#webhookServer.close();
    }

    this.#polling.started = false;
  }
}
