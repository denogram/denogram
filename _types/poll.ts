// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PollOption } from "./poll_option.ts";
import { MessageEntity } from "./message_entity.ts";

/**
 * Information about a poll
 * Ref: https://core.telegram.org/bots/api#poll
 */
export interface Poll {
  /** Unique poll identifier */
  id: string;
  /** Poll question, 1-255 characters */
  question: string;
  /** List of poll options */
  options: PollOption[];
  /** Total number of users that voted in the poll */
  total_voter_count: number;
  /** True, if the poll is closed */
  is_closed: boolean;
  /** True, if the poll is anonymous */
  is_anonymous: boolean;
  /** Poll type, currently can be “regular” or “quiz” */
  type: "regular" | "quiz";
  /** True, if the poll allows multiple answers */
  allows_multiple_answers: boolean;
  /**
   * 0-based identifier of the correct answer option.
   * Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot.
   */
  correct_option_id?: number;
  /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
  explanation?: string;
  /** Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
  explanation_entities?: MessageEntity[];
  /** Amount of time in seconds the poll will be active after creation */
  open_period?: number;
  /** Point in time (Unix timestamp) when the poll will be automatically closed */
  close_date?: number;
}
