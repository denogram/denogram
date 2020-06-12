// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramClient } from "./client.ts";
import { Update, User, Message } from "./_types/mod.ts";
import { GetUpdatesParams, SendMessageParams } from "./_types/params/mod.ts";

/** Telegram */
export class Telegram {
  constructor(public readonly client: TelegramClient) {
  }

  /**
   * Receive incoming updates using long polling.
   * Ref: https://core.telegram.org/bots/api#getupdates
   */
  public getUpdates(
    offset: number,
    params: Omit<GetUpdatesParams, "offset">,
  ): Promise<Update[]> {
    return this.client.method<Update[]>(
      `getUpdates?offset=${offset}&limit=${params.limit}&timeout=${params.timeout}`,
      {
        allowed_updates: params.allowedUpdates,
      },
    );
  }

  /**
   * Get basic information about the bot.
   * Ref: https://core.telegram.org/bots/api#getme
   */
  public getMe(): Promise<User> {
    return this.client.method<User>("getMe");
  }

  /**
   * Send text message.
   * Ref: https://core.telegram.org/bots/api#sendmessage
   */
  public sendMessage(
    chatId: number,
    params: Omit<SendMessageParams, "chat_id">,
  ): Promise<Message> {
    return this.client.method<Message>("sendMessage", {
      chat_id: chatId,
      ...params,
    });
  }

  public deleteMessage(
    chatId: number,
    messageId: number,
  ): Promise<boolean> {
    return this.client.method<boolean>("deleteMessage", {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}
