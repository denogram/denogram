// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramClient } from "./client.ts";
import { Command } from "./command.ts";
import { Context } from "./context.ts";
import { BotError } from "./error.ts";
import { Handler } from "./handler.ts";
import { Telegram } from "./telegram.ts";
import { Update } from "./_types/mod.ts";
import { GetUpdatesParams } from "./_types/params/mod.ts";
import { logger } from "./_util/mod.ts";
import { Logger } from "./deps.ts";

export type PollingConfig = GetUpdatesParams & {
  started: boolean;
};

export type PollingOptions = Omit<GetUpdatesParams, "offset" | "limit">;

/** Telegram bot */
export class Bot {
  private _polling: PollingConfig = {
    offset: 0,
    limit: 100,
    timeout: 30,
    allowedUpdates: [],
    started: false,
  };

  private readonly _client: TelegramClient = new TelegramClient(this._token);
  private readonly _telegram: Telegram = new Telegram(this._client);
  private _context?: Context;

  private _logger: Logger = logger;

  constructor(private readonly _token: string) {
  }

  private _commands: Command[] = [];

  /** Find command */
  private _findCommand(command: string): Command | undefined {
    return this._commands.find((el) => el.command === command);
  }

  /** Set handler for start command */
  public start(handler: Handler): void {
    if (!this._findCommand("start")) {
      this._commands.push({ command: "start", handler });
    } else {
      throw new BotError("Handler for start command already exists");
    }
  }

  /** Set handler for help command */
  public help(handler: Handler): void {
    if (!this._findCommand("help")) {
      this._commands.push({ command: "help", handler });
    } else {
      throw new BotError("Handler for help command already exists");
    }
  }

  /** Set handler for command */
  public command(command: string, handler: Handler): void {
    if (!this._findCommand(command)) {
      this._commands.push({ command, handler });
    } else {
      throw new BotError("Handler for this command already exists");
    }
  }

  /** Handle command */
  private _handleCommand(command: string): void {
    const _command = this._findCommand(command);
    if (_command) {
      if (this._context !== undefined) {
        _command.handler(this._context);
      }
    }
  }

  /** Handle update */
  private _handleUpdate(update: Update): void {
    this._logger.info(`Processing update ${update.update_id}`);

    this._context = new Context(update, this._telegram);

    if (update?.message?.text !== undefined) {
      const _text = update.message.text;

      // If command
      if (
        _text.length > 1 &&
        _text.length < 33 &&
        _text.startsWith("/")
      ) {
        const command = _text.substr(1);
        this._handleCommand(command);
      }
    }
  }

  /** Handle updates */
  private _handleUpdates(updates: Update[]): void {
    updates.forEach(this._handleUpdate.bind(this));
  }

  /** Fetch updates */
  private async _fetchUpdates(): Promise<void> {
    const _updates = await this._telegram.getUpdates(this._polling.offset, {
      limit: this._polling.limit,
      timeout: this._polling.timeout,
      allowedUpdates: this._polling.allowedUpdates,
    });

    this._handleUpdates(_updates);

    if (_updates.length > 0) {
      this._polling.offset = _updates[_updates.length - 1].update_id + 1;
    }

    if (this._polling) {
      await this._fetchUpdates();
    }
  }

  /** Start polling */
  private async _startPolling(
    limit: number = this._polling.limit,
    options: PollingOptions = {
      timeout: this._polling.timeout,
      allowedUpdates: this._polling.allowedUpdates,
    },
  ): Promise<void> {
    this._polling.limit = limit;
    this._polling.timeout = options.timeout;
    this._polling.allowedUpdates = options.allowedUpdates;

    if (!this._polling.started) {
      this._polling.started = true;
      await this._fetchUpdates();
    }
  }

  /** Launch bot */
  public async launch(): Promise<void> {
    const _botInfo = await this._telegram.getMe();

    this._logger.info(`Launching ${_botInfo.username}`);

    await this._startPolling();
  }

  /** Stop bot */
  public async stop(): Promise<void> {
    const _botInfo = await this._telegram.getMe();

    this._logger.info(`Stopping ${_botInfo.username}`);

    this._polling.started = false;
  }
}
