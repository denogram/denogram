// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { InlineKeyboardButton } from "./inline_keyboard_button.ts";

/**
 * Inline keyboard that appears right next to the message it belongs to.
 * Ref: https://core.telegram.org/bots/api#inlinekeyboardmarkup
 */
export interface InlineKeyboardMarkup {
  inline_keyboard: Array<InlineKeyboardButton[]>;
}
