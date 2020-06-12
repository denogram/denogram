// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "../user.ts";
import { OrderInfo } from "./order_info.ts";

/**
 * Information about an incoming pre-checkout query.
 * Ref: https://core.telegram.org/bots/api#precheckoutquery
 */
export interface PreCheckoutQuery {
  id: string;
  from: User;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id: string;
  order_info: OrderInfo;
}
