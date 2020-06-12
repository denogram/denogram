// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { ShippingAddress } from "./shipping_address.ts";

/**
 * Information about an order.
 * Ref: https://core.telegram.org/bots/api#orderinfo
 */
export interface OrderInfo {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: ShippingAddress;
}
