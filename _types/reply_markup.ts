// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { InlineKeyboardMarkup } from "./inline_keyboard_markup.ts";
import { ReplyKeyboardMarkup } from "./reply_keyboard_markup.ts";
import { ReplyKeyboardRemove } from "./reply_keyboard_remove.ts";
import { ForceReply } from "./force_reply.ts";

export type ReplyMarkup =
  | InlineKeyboardMarkup
  | ReplyKeyboardMarkup
  | ReplyKeyboardRemove
  | ForceReply;
