// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Shipping address.
 * Ref: https://core.telegram.org/bots/api#shippingaddress
 */
export interface ShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
}
