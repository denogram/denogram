// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "../user.ts";

/**
 * One row of the high scores table for a game.
 * Ref: https://core.telegram.org/bots/api#gamehighscore
 */
export interface GameHighScore {
  /** Position in high score table for the game */
  position: number;
  /** User */
  user: User;
  /** Score */
  score: number;
}
