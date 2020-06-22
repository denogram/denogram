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
  SendPhotoParameters,
} from "./types.ts";

/** Telegram */
export class Telegram extends Client {
  /** @see https://core.telegram.org/bots/api#getupdates */
  public getUpdates(
    parameters: GetUpdatesParameters,
  ): Promise<Update[]> {
    return this.method<Update[]>(
      `getUpdates?offset=${parameters.offset}&limit=${parameters.limit}&timeout=${parameters.timeout}`,
      {
        allowed_updates: parameters.allowedUpdates,
      },
    );
  }

  /** @see https://core.telegram.org/bots/api#setwebhook */
  public setWebhook(parameters: SetWebhookParameters): Promise<true> {
    return this.method<true>(`setWebhook?url=${parameters.url}`, {
      ...parameters,
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
  public sendMessage(parameters: SendMessageParameters): Promise<Message> {
    return this.method<Message>("sendMessage", {
      ...parameters,
    });
  }

  /** @see https://core.telegram.org/bots/api#forwardmessage */
  public forwardMessage(
    parameters: ForwardMessageParameters,
  ): Promise<Message> {
    return this.method<Message>("forwardMessage", {
      ...parameters,
    });
  }

  /** @see https://core.telegram.org/bots/api#sendphoto */
  public sendPhoto(parameters: SendPhotoParameters): Promise<Message> {
    return this.method<Message>("sendPhoto", {
      ...parameters,
    });
  }

  /** @see https://core.telegram.org/bots/api#leavechat */
  public leaveChat(chatId: number | string): Promise<true> {
    return this.method<true>(`leaveChat?chat_id=${chatId}`);
  }

  /** @see https://core.telegram.org/bots/api#getchat */
  public getChat(chatId: number | string): Promise<Chat> {
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
