// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Message } from "./message.ts";
import { InlineQuery } from "./inline_query.ts";
import { ChosenInlineResult } from "./chosen_inline_result.ts";
import { CallbackQuery } from "./callback_query.ts";
import { ShippingQuery } from "./shipping_query.ts";
import { PreCheckoutQuery } from "./pre_checkout_query.ts";
import { Poll } from "./poll.ts";
import { PollAnswer } from "./poll_answer.ts";

/** Incoming update */
export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
  shipping_query?: ShippingQuery;
  pre_checkout_query?: PreCheckoutQuery;
  poll?: Poll;
  poll_answer?: PollAnswer;
}
