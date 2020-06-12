// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { LoginUrl } from "./login_url.ts";
import { CallbackGame } from "./games/callback_game.ts";

/**
 * One button of an inline keyboard.
 * Ref: https://core.telegram.org/bots/api#inlinekeyboardbutton
 */
export interface InlineKeyboardButton {
  text: string;
  url?: string;
  login_url?: LoginUrl;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: CallbackGame;
  pay?: boolean;
}
