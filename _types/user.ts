// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Telegram user or bot.
 * Ref: https://core.telegram.org/bots/api#user
 */
export interface User {
  /** Unique identifier for this user or bot */
  id: number;
  /** True, if this user is a bot */
  is_bot: boolean;
  /** User's or bot's first name */
  first_name: string;
  /** User's or bot's last name */
  last_name?: string;
  /** User's or bot's username */
  username?: string;
  /** IETF language tag of the user's language */
  language_code?: string;
  /**
   * True, if the bot can be invited to groups.
   * Returned only in getMe.
   */
  can_join_groups?: boolean;
  /**
   * True, if privacy mode is disabled for the bot.
   * Returned only in getMe.
   */
  can_read_all_group_messages?: boolean;
  /**
   * True, if the bot supports inline queries.
   * Returned only in getMe.
   */
  supports_inline_queries?: boolean;
}
