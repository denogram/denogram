// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "./user.ts";

/**
 * One special entity in text message.
 * For example, hashtags, usernames, URLs, etc.
 * Ref: https://core.telegram.org/bots/api#messageentity
 */
export interface MessageEntity {
  /**
   * Type of the entity.
   * Can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “code” (mono width string), “pre” (mono width block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames)
   */
  type:
    | "mention"
    | "hashtag"
    | "cashtag"
    | "bot_command"
    | "url"
    | "email"
    | "phone_number"
    | "bold"
    | "italic"
    | "underline"
    | "strikethrough"
    | "code"
    | "pre"
    | "text_link"
    | "text_mention";
  /** Offset in UTF-16 code units to the start of the entity */
  offset: number;
  /** Length of the entity in UTF-16 code units */
  length: number;
  /** For “text_link” only, url that will be opened after user taps on the text */
  url?: string;
  /** For “text_mention” only, the mentioned user */
  user?: User;
  /** For “pre” only, the programming language of the entity text */
  language?: string;
}
