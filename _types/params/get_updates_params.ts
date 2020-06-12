// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * getUpdates parameters.
 * Ref: https://core.telegram.org/bots/api#getupdates
 */
export interface GetUpdatesParams {
  /**
   * Identifier of the first update to be returned.
   * Must be greater by one than the highest among the identifiers of previously received updates.
   * By default, updates starting with the earliest unconfirmed update are returned.
   * An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id.
   * The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue.
   * All previous updates will forgotten.
   */
  offset: number;
  /**
   * Limits the number of updates to be retrieved.
   * Values between 1-100 are accepted.
   * Defaults to 100.
   */
  limit: number;
  /**
   * Timeout in seconds for long polling.
   * Defaults to 0, i.e. usual short polling.
   * Should be positive, short polling should be used for testing purposes only.
   */
  timeout: number;
  allowedUpdates: string[];
}
