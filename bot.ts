// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { Composer } from "./composer.ts";
import { State, Context } from "./context.ts";
import { Telegram } from "./telegram.ts";
import { WebhookServer } from "./webhook_server.ts";
import {
  UpdateType,
  Update,
  GetUpdatesParameters,
  SetWebhookParameters,
} from "./types.ts";
import { Logger } from "./_util/mod.ts";

export type PollingOptions = GetUpdatesParameters;

export interface WebhookOptions extends Omit<SetWebhookParameters, "url"> {
  domain: string;
  path: string;
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
    allowedUpdates: [] as UpdateType[],
    started: false,
  };
  #webhookServer?: WebhookServer;

  readonly telegram: Telegram = new Telegram(this.token);
  #context?: Context<State>;

  readonly #logger: Logger = new Logger("INFO: ");

  constructor(readonly token: string) {
    super();
  }

  #handleUpdate = async (update: Readonly<Update>): Promise<void> => {
    this.#logger.print(`Processing update ${update.update_id}`);

    this.#context = new Context(update, this.telegram);
    this.#context.me = await this.telegram.getMe();
    this.middleware(this.#context, async () => {});
  };

  #handleUpdates = (updates: ReadonlyArray<Update>): void => {
    updates.forEach(this.#handleUpdate.bind(this));
  };

  #fetchUpdates = async (): Promise<void> => {
    if (!this.#polling.started) {
      return;
    }

    const updates = await this.telegram.getUpdates({
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

  #startPolling = async (options?: Readonly<PollingOptions>): Promise<void> => {
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

  #startWebhook = async (options: Readonly<WebhookOptions>): Promise<void> => {
    const { domain, path, port, ...rest } = options;

    await this.telegram.setWebhook({
      url: "https://" + domain + path,
      ...rest,
    });

    this.#webhookServer = new WebhookServer({
      path,
      handler: this.#handleUpdate.bind(this),
    });
    this.#webhookServer.listen(port);
  };

  async launch(options?: Readonly<LaunchOptions>): Promise<void> {
    this.#logger.print("Connecting to Telegram");

    const botInfo = await this.telegram.getMe();
    this.#logger.print(`Launching ${botInfo.username}`);

    // Long polling
    if (options?.webhook === undefined) {
      await this.telegram.deleteWebhook();

      await this.#startPolling(options?.polling);

      this.#logger.print("Bot started with long polling");
      return;
    }

    // Webhook
    await this.#startWebhook(options.webhook);

    this.#logger.print(`Bot started with webhook @ ${options.webhook.domain}`);
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
