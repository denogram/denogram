// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { serve, Server } from "./deps.ts";
import { Update } from "./types.ts";

/** Webhook server options */
export interface WebhookServerOptions {
  url: string;
  handler: (update: Update) => Promise<void> | void;
}

/** Webhook server */
export class WebhookServer {
  #server?: Server;

  constructor(
    private readonly _options: WebhookServerOptions,
  ) {}

  /** Listen */
  async listen(port: number): Promise<void> {
    this.#server = serve({ port });
    for await (const req of this.#server) {
      const path = new URL(this._options.url).pathname;
      if (req.method !== "POST" && req.url !== path) continue;

      // Read request body
      const buf: Uint8Array = await Deno.readAll(req.body);
      // Decode and parse request body
      const update = JSON.parse(new TextDecoder().decode(buf));

      this._options.handler(update);
    }
  }

  /** Close */
  close(): void {
    if (this.#server !== undefined) {
      this.#server.close();
    }
  }
}
