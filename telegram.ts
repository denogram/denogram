// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Client } from "./client.ts";
import {
  Update,
  WebhookInfo,
  User,
  Chat,
  Message,
  BotCommand,
  GetUpdatesParameters,
  SetWebhookParameters,
  SendMessageParameters,
  ForwardMessageParameters,
} from "./types.ts";

export type GetUpdatesOptions = Omit<GetUpdatesParameters, "offset">;

export type SetWebhookOptions = Omit<SetWebhookParameters, "url">;

export type SendMessageOptions = Omit<SendMessageParameters, "chat_id">;

export type ForwardMessageOptions = Omit<ForwardMessageParameters, "chat_id">;

export type SendPhotoOptions = Omit<ForwardMessageParameters, "chat_id">;

/** Telegram */
export class Telegram extends Client {
  /** @see https://core.telegram.org/bots/api#getupdates */
  public getUpdates(
    offset: number,
    options: GetUpdatesOptions,
  ): Promise<Update[]> {
    return this.method<Update[]>(
      `getUpdates?offset=${offset}&limit=${options.limit}&timeout=${options.timeout}`,
      {
        allowed_updates: options.allowedUpdates,
      },
    );
  }

  /** @see https://core.telegram.org/bots/api#setwebhook */
  public setWebhook(url: string, options: SetWebhookOptions): Promise<true> {
    return this.method<true>(`setWebhook?url=${url}`, {
      ...options,
    });
  }

  /** @see https://core.telegram.org/bots/api#deletewebhook */
  public deleteWebhook(): Promise<true> {
    return this.method<true>("deleteWebhook");
  }

  /** @see https://core.telegram.org/bots/api#getwebhookinfo */
  public getWebhookInfo(): Promise<WebhookInfo> {
    return this.method<WebhookInfo>("getWebhookInfo");
  }

  /** @see https://core.telegram.org/bots/api#getme */
  public getMe(): Promise<User> {
    return this.method<User>("getMe");
  }

  /** @see https://core.telegram.org/bots/api#sendmessage */
  public sendMessage(
    chatId: number | string,
    options: SendMessageOptions,
  ): Promise<Message> {
    return this.method<Message>("sendMessage", {
      chat_id: chatId,
      ...options,
    });
  }

  /** @see https://core.telegram.org/bots/api#forwardmessage */
  public forwardMessage(
    chatId: number | string,
    options: ForwardMessageOptions,
  ): Promise<Message> {
    return this.method<Message>("forwardMessage", {
      chat_id: chatId,
      ...options,
    });
  }

  /** @see https://core.telegram.org/bots/api#sendphoto */
  public sendPhoto(
    chatId: number,
    options: SendPhotoOptions,
  ): Promise<Message> {
    return this.method<Message>("sendPhoto", {
      chat_id: chatId,
      ...options,
    });
  }

  /** @see https://core.telegram.org/bots/api#getchat */
  public getChat(chatId: number): Promise<Chat> {
    return this.method<Chat>(`getChat?chat_id=${chatId}`);
  }

  /** @see https://core.telegram.org/bots/api#deletemessage */
  public deleteMessage(
    chatId: number,
    messageId: number,
  ): Promise<true> {
    return this.method<true>("deleteMessage", {
      chat_id: chatId,
      message_id: messageId,
    });
  }

  /** @see https://core.telegram.org/bots/api#setmycommands */
  public setMyCommands(commands: BotCommand[]): Promise<true> {
    return this.method<true>("setMyCommands", {
      commands,
    });
  }

  /** @see https://core.telegram.org/bots/api#getmycommands */
  public getMyCommands(): Promise<BotCommand[]> {
    return this.method<BotCommand[]>("getMyCommands");
  }
}
