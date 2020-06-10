// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Telegram } from "./telegram.ts";
import { Update, Message, Chat } from "./_types/mod.ts";

/** Context */
export class Context {
  public readonly message?: Message;
  public readonly chat?: Chat;

  constructor(
    public readonly update: Update,
    public readonly telegram: Telegram,
  ) {
    this.message = update.message;
    this.chat = this.message?.chat;
  }

  public async reply(text: string): Promise<void> {
    if (this.message !== undefined && this.chat !== undefined) {
      await this.telegram.sendMessage({
        chatId: this.chat.id,
        text,
        params: {
          reply_to_message_id: this.message.message_id,
        },
      });
    }
  }
}
