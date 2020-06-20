import { serve, Server } from "./deps.ts";
import { Update } from "./types.ts";

/** Webhook server options */
export interface WebhookServerOptions {
  url: string;
  handler: (update: Update) => void;
}

/** Webhook server */
export class WebhookServer {
  private _server?: Server;

  constructor(
    private readonly _options: WebhookServerOptions,
  ) {}

  /** Listen */
  async listen(port: number): Promise<void> {
    this._server = serve({ port });
    for await (const req of this._server) {
      const path = new URL(this._options.url).pathname;
      if (req.method !== "POST" && req.url !== path) {
        continue;
      }

      // Decode and parse request body
      const buf: Uint8Array = await Deno.readAll(req.body);
      const decoder = new TextDecoder();
      const update = JSON.parse(decoder.decode(buf));

      this._options.handler(update);
    }
  }

  /** Close */
  close(): void {
    if (this._server !== undefined) {
      this._server.close();
    }
  }
}
