// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/** Telegram Error */
export class TelegramError extends Error {
  name = "TelegramError";

  constructor(message: string) {
    super(message);
  }
}

/** Bot Error */
export class BotError extends Error {
  name = "BotError";

  constructor(message: string) {
    super(message);
  }
}
