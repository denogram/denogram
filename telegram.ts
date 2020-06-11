// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramClient } from "./client.ts";
import { Update, User, Message } from "./_types/mod.ts";

export interface GetUpdatesOptions {
  offset: number;
  limit: number;
  timeout: number;
  allowedUpdates: string[];
}

export interface SendMessageOptions {
  chatId: number;
  text: string;
  params?: any;
}

/** Telegram */
export class Telegram {
  constructor(public readonly client: TelegramClient) {
  }

  public getUpdates(options: GetUpdatesOptions): Promise<Update[]> {
    const _url =
      `getUpdates?offset=${options.offset}&limit=${options.limit}&timeout=${options.timeout}`;

    return this.client.method<Update[]>(_url, {
      allowed_updates: options.allowedUpdates,
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