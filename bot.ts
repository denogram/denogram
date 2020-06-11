// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramClient } from "./client.ts";
import { Command } from "./command.ts";
import { Context } from "./context.ts";
import { BotError } from "./error.ts";
import { Handler } from "./handler.ts";
import { Telegram, GetUpdatesOptions } from "./telegram.ts";
import { Update } from "./_types/mod.ts";
import { Constants, logger } from "./_util/mod.ts";
import { Logger } from "./deps.ts";

export interface PollingOptions extends GetUpdatesOptions {
  started: boolean;
}

/** Telegram bot */
export class Bot {
  private _polling: PollingOptions = {
    offset: Constants.DefaultOptions.Offset,
    limit: Constants.DefaultOptions.Limit,
    timeout: Constants.DefaultOptions.Timeout,
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

  /** Define handler for start command */
  public start(handler: Handler): void {
    if (!this._findCommand(Constants.Command.Start)) {
      this._commands.push({ command: Constants.Command.Start, handler });
    } else {
      throw new BotError("Handler for start command already exists");
    }
  }

  /** Define handler for help command */
  public help(handler: Handler): void {
    if (!this._findCommand(Constants.Command.Help)) {
      this._commands.push({ command: Constants.Command.Help, handler });
    } else {
      throw new BotError("Handler for help command already exists");
    }
  }

  /** Define handler for command */
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
        _text.startsWith(Constants.Command.Prefix)
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
    const _updates = await this._telegram.getUpdates({
      offset: this._polling.offset,
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
    limit: number = Constants.DefaultOptions.Limit,
    timeout: number = Constants.DefaultOptions.Timeout,
    allowedUpdates: string[] = [],
  ): Promise<void> {
    this._polling.limit = limit;
    this._polling.timeout = timeout;
    this._polling.allowedUpdates = allowedUpdates;

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
