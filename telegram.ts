// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { Client } from "./client.ts";
import {
  AnswerCallbackQueryParameters, BotCommand, Chat, ForwardMessageParameters, GetUpdatesParameters,
  KickChatMemberParameters, Message, SendChatActionParameters, SendMessageParameters, SendPhotoParameters,
  SetWebhookParameters, Update, User, WebhookInfo,
} from "./types.ts";

/** Telegram Bot API client wrapper */
export class Telegram extends Client {
  /** ref: https://core.telegram.org/bots/api#getupdates */
  getUpdates(parameters: GetUpdatesParameters): Promise<Update[]> {
    return this.method<Update[]>("getUpdates", { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#setwebhook */
  setWebhook(parameters: SetWebhookParameters): Promise<true> {
    return this.method<true>(`setWebhook`, { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#deletewebhook */
  deleteWebhook(): Promise<true> {
    return this.method<true>("deleteWebhook");
  }

  /** ref: https://core.telegram.org/bots/api#getwebhookinfo */
  getWebhookInfo(): Promise<WebhookInfo> {
    return this.method<WebhookInfo>("getWebhookInfo");
  }

  /** ref: https://core.telegram.org/bots/api#getme */
  getMe(): Promise<User> {
    return this.method<User>("getMe");
  }

  /** ref: https://core.telegram.org/bots/api#sendchataction */
  sendChatAction(parameters: SendChatActionParameters): Promise<true> {
    return this.method<true>("sendChatAction", { ...parameters });  }

  /** ref: https://core.telegram.org/bots/api#sendmessage */
  sendMessage(parameters: SendMessageParameters): Promise<Message> {
    return this.method<Message>("sendMessage", { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#forwardmessage */
  forwardMessage(parameters: ForwardMessageParameters): Promise<Message> {
    return this.method<Message>("forwardMessage", { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#sendphoto */
  sendPhoto(parameters: SendPhotoParameters): Promise<Message> {
    return this.method<Message>("sendPhoto", { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#kickchatmember */
  kickChatMember(parameters: KickChatMemberParameters): Promise<true> {
    return this.method<true>("kickChatMember", { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#unbanchatmember */
  unbanChatMember(chatId: number | string, userId: number): Promise<true> {
    return this.method<true>(
      "unbanChatMember",
      { chat_id: chatId, user_id: userId },
    );
  }

  /** ref: https://core.telegram.org/bots/api#leavechat */
  leaveChat(chatId: number | string): Promise<true> {
    return this.method<true>("leaveChat", {
      chat_id: chatId,
    });
  }

  /** ref: https://core.telegram.org/bots/api#getchat */
  getChat(chatId: number | string): Promise<Chat> {
    return this.method<Chat>("getChat", {
      chat_id: chatId,
    });
  }

  /** ref: https://core.telegram.org/bots/api#answercallbackquery */
  answerCallbackQuery(parameters: AnswerCallbackQueryParameters) {
    return this.method<true>("answerCallbackQuery", { ...parameters });
  }

  /** ref: https://core.telegram.org/bots/api#setmycommands */
  setMyCommands(commands: BotCommand[]): Promise<true> {
    return this.method<true>("setMyCommands", { commands });
  }

  /** ref: https://core.telegram.org/bots/api#getmycommands */
  getMyCommands(): Promise<BotCommand[]> {
    return this.method<BotCommand[]>("getMyCommands");
  }

  /** ref: https://core.telegram.org/bots/api#deletemessage */
  deleteMessage(chatId: number, messageId: number): Promise<true> {
    return this.method<true>(
      "deleteMessage",
      { chat_id: chatId, message_id: messageId },
    );
  }
}
