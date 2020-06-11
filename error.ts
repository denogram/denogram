// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/** Telegram error */
export class TelegramError extends Error {
  name = "TelegramError";

  constructor(message: string) {
    super(message);
  }
}

/** Bot error */
export class BotError extends Error {
  name = "BotError";

  constructor(message: string) {
    super(message);
  }
}
