// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { Telegram } from "./telegram.ts";
import {
  UpdateType,
  Update,
  GetUpdatesParameters,
} from "./types.ts";
import { Logger } from "./_util/logger.ts";

/** Telegram Bot */
export class Bot implements AsyncIterable<Update> {
  readonly #polling = {
    offset: 0,
    limit: 100,
    timeout: 30,
    allowedUpdates: [] as UpdateType[],
    running: true,
  };

  readonly #telegram: Telegram;
  readonly #logger: Logger = new Logger("INFO: ");

  constructor(token: string) {
    this.#telegram = new Telegram(token);
  }

  get telegram(): Telegram {
    return this.#telegram;
  }

  async *run(
    options?: Readonly<GetUpdatesParameters>,
  ): AsyncIterableIterator<Update> {
    this.#logger.print("Connecting to Telegram");

    const { username } = await this.#telegram.getMe();
    this.#logger.print(`Running ${username}`);

    while (this.#polling.running) {
      const { offset, limit, timeout, allowed_updates } = options ?? {};

      const updates = await this.#telegram.getUpdates({
        offset: offset ?? this.#polling.offset,
        limit: limit ?? this.#polling.limit,
        timeout: timeout ?? this.#polling.timeout,
        allowed_updates: allowed_updates ?? this.#polling.allowedUpdates,
      });

      for (const update of updates) {
        this.#logger.print(`Processing update ${update.update_id}`);

        yield update;
      }

      if (updates.length > 0) {
        this.#polling.offset = updates[updates.length - 1].update_id + 1;
      }
    }
  }

  stop() {
    this.#polling.running = false;
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<Update> {
    return this.run();
  }
}

export function createBot(token: string): Bot {
  return new Bot(token);
}
