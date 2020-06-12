// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "../user.ts";
import { Location } from "../location.ts";

/**
 * Incoming inline query.
 * When the user sends an empty query, your bot could return some default or trending results.
 * Ref: https://core.telegram.org/bots/api#inlinequery
 */
export interface InlineQuery {
  /** Unique identifier for this query */
  id: string;
  /** Sender */
  from: User;
  /** Sender location, only for bots that request user location */
  location?: Location;
  /** Text of the query (up to 256 characters) */
  query: string;
  /** Offset of the results to be returned, can be controlled by the bot */
  offset: string;
}
