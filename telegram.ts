// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramClient } from "./client.ts";
import { Update, User, Message } from "./_types/mod.ts";
import { Constants } from "./_util/mod.ts";

export interface SendMessageOptions {
  chatId: number;
  text: string;
  params?: any;
}

/** Telegram */
export class Telegram {
  constructor(public readonly client: TelegramClient) {
  }

  public getUpdates(
    offset: number,
    allowedUpdates?: string[],
  ): Promise<Update[]> {
    const _limit: number = Constants.Default.Limit;
    const _timeout: number = Constants.Default.Timeout;
    const _allowedUpdates = allowedUpdates || [];

    const _url =
      `getUpdates?offset=${offset}&limit=${_limit}&timeout=${_timeout}`;

    return this.client.method<Update[]>(_url, {
      allowed_updates: _allowedUpdates,
    });
  }

  public getMe(): Promise<User> {
    return this.client.method<User>("getMe");
  }

  public sendMessage(options: SendMessageOptions): Promise<Message> {
    return this.client.method<Message>("sendMessage", {
      chat_id: options.chatId,
      text: options.text,
      ...options.params,
    });
  }
}
