// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Phone contact.
 * Ref: https://core.telegram.org/bots/api#contact
 */
export interface Contact {
  /** Contact's phone number */
  phone_number: number;
  /** Contact's first name */
  first_name: string;
  /** Contact's last name */
  last_name?: string;
  /** Contact's user identifier in Telegram */
  user_id?: number;
  /** Additional data about the contact in the form of a vCard */
  vcard?: string;
}
