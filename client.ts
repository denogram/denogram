// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { TelegramError } from "./error.ts";

/** Telegram Bot API client */
export class Client {
  readonly #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  /** ref: https://core.telegram.org/bots/api#making-requests */
  async method<T>(
    name: string,
    payload?: object,
  ): Promise<T> {
    // template: https://api.telegram.org/bot<bot_token>/<method_name>
    const res = await fetch(
      `https://api.telegram.org/bot${this.#token}/${name}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          connection: "keep-alive",
        },
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json();

    if (!data.ok) {
      throw new TelegramError(data.error_code, data.description);
    }

    return data.result;
  }
}
