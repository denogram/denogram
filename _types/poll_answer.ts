// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "./user.ts";

/**
 * Answer of a user in a non-anonymous poll.
 * Ref: https://core.telegram.org/bots/api#pollanswer
 */
export interface PollAnswer {
  /** Unique poll identifier */
  poll_id: string;
  /** The user, who changed the answer to the poll */
  user: User;
  /**
   * 0-based identifiers of answer options, chosen by the user.
   * May be empty if the user retracted their vote.
   */
  option_ids: number[];
}
