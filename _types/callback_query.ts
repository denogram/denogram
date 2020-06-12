// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "./user.ts";
import { Message } from "./message.ts";

/**
 * Incoming callback query from a callback button in an inline keyboard.
 * If the button that originated the query was attached to a message sent by the bot, the field message will be present.
 * If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present.
 * Exactly one of the fields data or game_short_name will be present.
 * Ref: https://core.telegram.org/bots/api#callbackquery
 */
export interface CallbackQuery {
  /** Unique identifier for this query */
  id: string;
  /** Sender */
  from: User;
  /**
   * Message with the callback button that originated the query.
   * Note that message content and message date will not be available if the message is too old
   */
  message?: Message;
  /** Identifier of the message sent via the bot in inline mode, that originated the query. */
  inline_message_id?: string;
  /**
   * Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent.
   * Useful for high scores in games.
   */
  chat_instance: string;
  /**
   * Data associated with the callback button.
   * Be aware that a bad client can send arbitrary data in this field.
   */
  data?: string;
  /** Short name of a Game to be returned, serves as the unique identifier for the game */
  game_short_name?: string;
}
