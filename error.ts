// Copyright 2020 the denogram authors. All rights reserved. MIT license.

export class TelegramError extends Error {
  code: number;
  description: string;

  constructor(code: number, description: string) {
    super(`telegram: ${code} ${description}`);

    this.code = code;
    this.description = description;
  }
}
