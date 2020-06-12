// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Basic information about an invoice.
 * Ref: https://core.telegram.org/bots/api#invoice
 */
export interface Invoice {
  title: string;
  description: string;
  start_parameter: string;
  currency: string;
  total_amount: number;
}
