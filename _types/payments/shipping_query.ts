// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "../user.ts";
import { ShippingAddress } from "./shipping_address.ts";

/**
 * Information about an incoming shipping query.
 * Ref: https://core.telegram.org/bots/api#shippingquery
 */
export interface ShippingQuery {
  id: string;
  from: User;
  invoice_payload: string;
  shipping_address: ShippingAddress;
}
