// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { ReplyMarkup } from "../reply_markup.ts";

/**
 * sendMessage parameters.
 * Ref: https://core.telegram.org/bots/api#sendmessage
 */
export interface SendMessageParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number;
  /** Text of the message to be sent, 1-4096 characters after entities parsing */
  text: string;
  /**
   * Mode for parsing entities in the message text.
   * Ref: https://core.telegram.org/bots/api#formatting-options
   */
  parse_mode?: string;
  /** Disables link previews for links in this message */
  disable_web_page_preview?: boolean;
  /** Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /**
   * Additional interface options.
   * A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?: ReplyMarkup;
}
