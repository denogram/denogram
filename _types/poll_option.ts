// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Information about one answer option in a poll.
 * Ref: https://core.telegram.org/bots/api#polloption
 */
export interface PollOption {
  /** Option text, 1-100 characters */
  text: string;
  /** Number of users that voted for this option */
  voter_count: number;
}
