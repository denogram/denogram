// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { encoder } from "./mod.ts";

export class Logger {
  #prefix?: string;

  constructor(prefix?: string) {
    this.#prefix = prefix;
  }

  set prefix(value: Readonly<string>) {
    this.#prefix = value;
  }

  #formatDate = (date: Readonly<Date>): string => {
    const s = date.toISOString();
    return `${s.slice(0, 10).replaceAll("-", "/")} ${s.slice(11, 19)}`;
  };

  print(s: Readonly<string>): void {
    const date = this.#formatDate(new Date());
    Deno.stdout.write(encoder.encode(`${this.#prefix ?? ""}${date} ${s}\n`));
  }
}
