// Copyright 2020 the denogram authors. All rights reserved. MIT license.

export class TelegramError extends Error {
  readonly #code: number;
  readonly #description: string;

  constructor(code: number, description: string) {
    super(`telegram: ${code} ${description}`);

    this.#code = code;
    this.#description = description;
  }

  get code(): number {
    return this.#code;
  }

  get description(): string {
    return this.#description;
  }
}
