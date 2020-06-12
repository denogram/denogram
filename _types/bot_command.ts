// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Bot command.
 * Ref: https://core.telegram.org/bots/api#botcommand
 */
export interface BotCommand {
  /**
   * Text of the command, 1-32 characters.
   * Can contain only lowercase English letters, digits and underscores.
   */
  command: string;
  /** Description of the command, 3-256 characters. */
  description: string;
}
