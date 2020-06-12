// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Parameter of the inline keyboard button used to automatically authorize a user.
 * Serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram.
 * Ref: https://core.telegram.org/bots/api#loginurl
 */
export interface LoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
}
