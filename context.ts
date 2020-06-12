// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Telegram } from "./telegram.ts";
import { Update, Chat, Message } from "./_types/mod.ts";
import { SendMessageParams } from "./_types/params/mod.ts";

export type ReplyParams = Omit<
  SendMessageParams,
  "chat_id" | "text" | "reply_to_message_id"
>;

/** Context */
export class Context {
  public readonly state = new Map<string, unknown>();

  public readonly message?: Message;
  public readonly chat?: Chat;

  constructor(
    private readonly _update: Update,
    public readonly telegram: Telegram,
  ) {
    this.message = _update.message;
    this.chat = this.message?.chat;
  }

  public reply(
    text: string,
    params?: ReplyParams,
  ): Promise<Message> | undefined {
    if (this.message !== undefined && this.chat !== undefined) {
      return this.telegram.sendMessage(this.chat.id, {
        text,
        reply_to_message_id: this.message.message_id,
        ...params,
      });
    }
  }

  public deleteMessage(): Promise<boolean> | undefined {
    if (this.message !== undefined && this.chat !== undefined) {
      return this.telegram.deleteMessage(this.chat.id, this.message.message_id);
    }
  }
}
