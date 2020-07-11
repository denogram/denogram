// Copyright 2020 the denogram authors. All rights reserved. MIT license.

const encoder = new TextEncoder();

export class Logger {
  #prefix?: string;

  constructor(prefix?: string) {
    this.#prefix = prefix;
  }

  set prefix(value: string) {
    this.#prefix = value;
  }

  print(s: Readonly<string>): void {
    Deno.stdout.write(
      encoder.encode(
        `${(this.#prefix ?? "")}${new Date().toISOString()} ${s}\n`,
      ),
    );
  }
}
