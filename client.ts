// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramError } from "./error.ts";
import { Constants } from "./_util/mod.ts";

/** Telegram client */
export class TelegramClient {
  constructor(private readonly _token: string) {
  }

  private readonly _apiBaseUrl: string = Constants.Api.BaseUrl;

  public async method<T>(
    method: string,
    payload = {},
  ): Promise<T> {
    const _apiUrl = `${this._apiBaseUrl}/bot${this._token}/${method}`;

    const res = await fetch(_apiUrl, {
      method: "POST",
      headers: { "content-type": "application/json", connection: "keep-alive" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    const { ok, result } = data;

    if (!ok) {
      throw new TelegramError(data);
    }

    return result;
  }
}
