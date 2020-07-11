// Copyright 2020 the denogram authors. All rights reserved. MIT license.

export class TelegramError extends Error {
  constructor(readonly code: number, readonly description: string) {
    super(`telegram: ${code} ${description}`);
  }
}
