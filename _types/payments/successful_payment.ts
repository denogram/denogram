// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { OrderInfo } from "./order_info.ts";

/**
 * Basic information about a successful payment.
 * Ref: https://core.telegram.org/bots/api#successfulpayment
 */
export interface SuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}
