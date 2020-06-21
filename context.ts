// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Telegram } from "./telegram.ts";
import {
  UpdateType,
  Update,
  User,
  Chat,
  MessageSubType,
  Message,
  BotCommand,
  InlineQuery,
  ChosenInlineResult,
  CallbackQuery,
  ShippingQuery,
  PreCheckoutQuery,
  Poll,
  PollAnswer,
  SendMessageParameters,
  ForwardMessageParameters,
} from "./types.ts";

const updateTypes: UpdateType[] = [
  "message",
  "edited_message",
  "channel_post",
  "edited_channel_post",
  "inline_query",
  "chosen_inline_result",
  "callback_query",
  "shipping_query",
  "pre_checkout_query",
  "poll",
  "poll_answer",
];

const messageSubTypes: MessageSubType[] = [
  "text",
  "animation",
  "audio",
  "document",
  "photo",
  "sticker",
  "video",
  "video_note",
  "voice",
  "contact",
  "dice",
  "game",
  "poll",
  "venue",
  "location",
  "new_chat_members",
  "left_chat_member",
  "new_chat_title",
  "new_chat_photo",
  "delete_chat_photo",
  "group_chat_created",
  "supergroup_chat_created",
  "channel_chat_created",
  "migrate_to_chat_id",
  "migrate_from_chat_id",
  "pinned_message",
  "invoice",
  "successful_payment",
  "connected_website",
  "passport_data",
  "forward_date",
];

const messageSubTypesMapping: Record<string, unknown> = {
  forward_date: "forward",
};

export type State = Record<string, unknown>;

export type ReplyOptions = Omit<
  SendMessageParameters,
  "chat_id" | "text" | "reply_to_message_id"
>;

export type ReplyWithMarkdownV2Options = Omit<ReplyOptions, "parse_mode">;

export type ReplyWithHTMLOptions = Omit<ReplyOptions, "parse_mode">;

export type ReplyWithMarkdownOptions = Omit<ReplyOptions, "parse_mode">;

export type ForwardMessageOptions = Omit<
  ForwardMessageParameters,
  "chat_id" | "from_chat_id"
>;

/** Context */
export class Context {
  private _state?: State;

  public readonly updateType: UpdateType;
  public readonly updateSubTypes: MessageSubType[];

  constructor(
    public readonly update: Update,
    public readonly telegram: Telegram,
  ) {
    this.updateType = updateTypes.find((key: UpdateType) =>
      key in this.update
    ) as UpdateType;
    if (this.updateType === "message" || this.updateType === "channel_post") {
      this.updateSubTypes = messageSubTypes
        .filter((key: MessageSubType) =>
          key in (this.update[this.updateType] as Message)
        )
        .map((type: MessageSubType) =>
          (messageSubTypesMapping[type] as MessageSubType) || type
        );
    } else {
      this.updateSubTypes = [];
    }
  }

  get message(): Message | undefined {
    return this.update.message;
  }

  get editedMessage(): Message | undefined {
    return this.update.edited_message;
  }

  get channelPost(): Message | undefined {
    return this.update.channel_post;
  }

  get editedChannelPost(): Message | undefined {
    return this.update.edited_channel_post;
  }

  get inlineQuery(): InlineQuery | undefined {
    return this.update.inline_query;
  }

  get chosenInlineResult(): ChosenInlineResult | undefined {
    return this.update.chosen_inline_result;
  }

  get callbackQuery(): CallbackQuery | undefined {
    return this.update.callback_query;
  }

  get shippingQuery(): ShippingQuery | undefined {
    return this.update.shipping_query;
  }

  get preCheckoutQuery(): PreCheckoutQuery | undefined {
    return this.update.pre_checkout_query;
  }

  get poll(): Poll | undefined {
    return this.update.poll;
  }

  get pollAnswer(): PollAnswer | undefined {
    return this.update.poll_answer;
  }

  get chat(): Chat | undefined {
    return (this.message && this.message.chat) ||
      (this.editedMessage && this.editedMessage.chat) ||
      (this.channelPost && this.channelPost.chat) ||
      (this.editedChannelPost && this.editedChannelPost.chat) ||
      (this.callbackQuery && this.callbackQuery.message &&
        this.callbackQuery.message.chat);
  }

  get from(): User | undefined {
    return (this.message && this.message.from) ||
      (this.editedMessage && this.editedMessage.from) ||
      (this.channelPost && this.channelPost.from) ||
      (this.editedChannelPost && this.editedChannelPost.from) ||
      (this.inlineQuery && this.inlineQuery.from) ||
      (this.chosenInlineResult && this.chosenInlineResult.from) ||
      (this.callbackQuery && this.callbackQuery.from) ||
      (this.shippingQuery && this.shippingQuery.from) ||
      (this.preCheckoutQuery && this.preCheckoutQuery.from);
  }

  get state(): State {
    if (this._state === undefined) {
      this._state = {};
    }
    return this._state;
  }

  set state(value: State) {
    this._state = { ...value };
  }

  public reply(
    text: string,
    options?: ReplyOptions,
  ): Promise<Message> | undefined {
    if (this.message !== undefined && this.chat !== undefined) {
      return this.telegram.sendMessage(this.chat.id, {
        text,
        reply_to_message_id: this.message.message_id,
        ...options,
      });
    }
  }

  public replyWithMarkdownV2(
    text: string,
    options?: ReplyWithMarkdownV2Options,
  ): Promise<Message> | undefined {
    return this.reply(text, {
      parse_mode: "MarkdownV2",
      ...options,
    });
  }

  public replyWithHTML(
    text: string,
    options?: ReplyWithHTMLOptions,
  ): Promise<Message> | undefined {
    return this.reply(text, {
      parse_mode: "HTML",
      ...options,
    });
  }

  public replyWithMarkdown(
    text: string,
    options?: ReplyWithMarkdownOptions,
  ): Promise<Message> | undefined {
    return this.reply(text, {
      parse_mode: "Markdown",
      ...options,
    });
  }

  public forwardMessage(
    chatId: number | string,
    options: ForwardMessageOptions,
  ): Promise<Message> | undefined {
    if (this.chat !== undefined) {
      return this.telegram.forwardMessage(chatId, {
        from_chat_id: this.chat.id,
        ...options,
      });
    }
  }

  public getChat(): Promise<Chat> | undefined {
    if (this.chat !== undefined) {
      return this.telegram.getChat(this.chat.id);
    }
  }

  public deleteMessage(): Promise<true> | undefined {
    if (this.message !== undefined && this.chat !== undefined) {
      return this.telegram.deleteMessage(this.chat.id, this.message.message_id);
    }
  }

  public setMyCommands(commands: BotCommand[]): Promise<true> {
    return this.telegram.setMyCommands(commands);
  }

  public getMyCommands(): Promise<BotCommand[]> {
    return this.telegram.getMyCommands();
  }
}
