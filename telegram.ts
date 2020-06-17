// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Client } from "./client.ts";
import { Update, User, Chat, Message } from "./_types/mod.ts";
import { GetUpdatesParams, SendMessageParams } from "./_types/params/mod.ts";

/** Telegram */
export class Telegram {
  public client: Client;

  constructor(private readonly _token: string) {
    this.client = new Client(_token);
  }

  /**
   * Receive incoming updates using long polling.
   * Ref: https://core.telegram.org/bots/api#getupdates
   */
  public getUpdates(
    offset: number,
    options: Omit<GetUpdatesParams, "offset">,
  ): Promise<Update[]> {
    return this.client.method<Update[]>(
      `getUpdates?offset=${offset}&limit=${options.limit}&timeout=${options.timeout}`,
      {
        allowed_updates: options.allowedUpdates,
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
    options: Omit<SendMessageParams, "chat_id">,
  ): Promise<Message> {
    return this.client.method<Message>("sendMessage", {
      chat_id: chatId,
      ...options,
    });
  }

  public getChat(chatId: number): Promise<Chat> {
    return this.client.method<Chat>(`getChat?chat_id=${chatId}`);
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
