// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { Composer } from "./composer.ts";
import { State, Context } from "./context.ts";
import { Telegram } from "./telegram.ts";
import { WebhookServer } from "./webhook_server.ts";
import { Update, GetUpdatesParameters, SetWebhookParameters } from "./types.ts";
import { Logger } from "./_util/mod.ts";

export type PollingOptions = GetUpdatesParameters;

export interface WebhookOptions extends SetWebhookParameters {
  port: number;
}

export interface LaunchOptions {
  polling?: PollingOptions;
  webhook?: WebhookOptions;
}

/** Telegram Bot */
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
  readonly #logger: Logger = new Logger("INFO: ");

  constructor(readonly token: string) {
    super();

    this.#telegram = new Telegram(this.token);
  }

  #handleUpdate = async (update: Update): Promise<void> => {
    this.#logger.print(`Processing update ${update.update_id}`);

    this.#context = new Context(update, this.#telegram);
    this.#context.me = await this.#telegram.getMe();
    this.middleware(this.#context, async () => {});
  };

  #handleUpdates = (updates: ReadonlyArray<Update>): void => {
    updates.forEach(this.#handleUpdate.bind(this));
  };

  #fetchUpdates = async (): Promise<void> => {
    if (!this.#polling.started) {
      return;
    }

    const updates = await this.#telegram.getUpdates({
      offset: this.#polling.offset,
      limit: this.#polling.limit,
      timeout: this.#polling.timeout,
      allowedUpdates: this.#polling.allowedUpdates,
    });

    this.#handleUpdates(updates);

    if (updates.length > 0) {
      this.#polling.offset = updates[updates.length - 1].update_id + 1;
    }

    this.#fetchUpdates();
  };

  #startPolling = async (options?: PollingOptions): Promise<void> => {
    if (options !== undefined) {
      this.#polling.offset = options.offset;
      this.#polling.limit = options.limit;
      this.#polling.timeout = options.timeout;
      this.#polling.allowedUpdates = options.allowedUpdates;
    }

    if (!this.#polling.started) {
      this.#polling.started = true;
      this.#fetchUpdates();
    }
  };

  #startWebhook = async (options: WebhookOptions): Promise<void> => {
    const { url, port, ...rest } = options;

    await this.#telegram.setWebhook({
      url,
      ...rest,
    });

    const path = new URL(url).pathname;

    this.#webhookServer = new WebhookServer({
      path,
      handler: this.#handleUpdate.bind(this),
    });
    this.#webhookServer.listen(port);
  };

  async launch(options?: LaunchOptions): Promise<void> {
    this.#logger.print("Connecting to Telegram");

    const botInfo = await this.#telegram.getMe();
    this.#logger.print(`Launching ${botInfo.username}`);

    // Long polling
    if (options?.webhook === undefined) {
      await this.#telegram.deleteWebhook();

      const { offset, limit, timeout, allowedUpdates } = options?.polling || {};

      await this.#startPolling({
        offset: offset || this.#polling.offset,
        limit: limit || this.#polling.limit,
        timeout: timeout || this.#polling.timeout,
        allowedUpdates: allowedUpdates || this.#polling.allowedUpdates,
      });

      this.#logger.print(`Bot started with long polling`);
      return;
    }

    // Webhook
    await this.#startWebhook(options.webhook);

    const host = new URL(options.webhook.url).host;

    this.#logger.print(`Bot started with webhook @ ${host}`);
  }

  async stop(): Promise<void> {
    this.#logger.print("Stopping bot");

    if (this.#webhookServer !== undefined) {
      this.#webhookServer.close();
      return;
    }

    this.#polling.started = false;
  }
}
