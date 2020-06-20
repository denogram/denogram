// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramError } from "./error.ts";

/** Telegram Bot API client */
export class Client {
  constructor(private readonly _token: string) {
  }

  /** @see https://core.telegram.org/bots/api#making-requests */
  public async method<T>(
    name: string,
    payload = {},
  ): Promise<T> {
    // https://api.telegram.org/bot<bot_token>/<method_name>
    const res = await fetch(
      `https://api.telegram.org/bot${this._token}/${name}`,
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
