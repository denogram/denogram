// Copyright 2020 the denogram authors. All rights reserved. MIT license.

export class Logger {
  constructor(readonly prefix?: string) {}

  print(s: Readonly<string>): void {
    const msg: string = [
      (this.prefix ?? ""),
      new Date().toLocaleString(),
      " ",
      s,
      "\n",
    ].join("");

    Deno.stdout.write(new TextEncoder().encode(msg));
  }
}
