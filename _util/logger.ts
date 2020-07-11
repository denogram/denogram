// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { encode } from "./mod.ts";

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
      encode(`${(this.#prefix ?? "")}${new Date().toISOString()} ${s}\n`),
    );
  }
}
