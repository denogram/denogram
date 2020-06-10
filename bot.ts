// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { TelegramClient } from "./client.ts";
import { Command } from "./command.ts";
import { Context } from "./context.ts";
import { BotError } from "./error.ts";
import { Handler } from "./handler.ts";
import { Telegram } from "./telegram.ts";
import { Update } from "./_types/mod.ts";
import { Constants, logger } from "./_util/mod.ts";
import { Logger } from "./deps.ts";

/** Telegram bot */
export class Bot {
  private _polling?: boolean;

  private _offset: number = Constants.Default.Offset;
  private readonly _allowedUpdates: string[] = [];

  private readonly _client = new TelegramClient(this._token);
  private readonly _telegram = new Telegram(this._client);

  private _logger: Logger = logger;

  constructor(private readonly _token: string) {
  }

  private _commands: Command[] = [];

  /** Find command */
  private _find(command: string): Command | undefined {
    return this._commands.find((el) => el.command === command);
  }

  /** Define handler for start command */
  public start(handler: Handler): void {
    if (!this._find(Constants.Command.Start)) {
      this._commands.push({ command: Constants.Command.Start, handler });
    } else {
      throw new BotError("Start command handler already exists");
    }
  }

  /** Define handler for help command */
  public help(handler: Handler): void {
    if (!this._find(Constants.Command.Help)) {
      this._commands.push({ command: Constants.Command.Help, handler });
    } else {
      throw new BotError("Help command handler already exists");
    }
  }

  /** Define controller for command */
  public command(command: string, controller: Handler): void {
    if (!this._find(command)) {
      this._commands.push({ command, handler: controller });
    } else {
      throw new BotError("Command already exists");
    }
  }

  /** Handle command */
  private _handleCommand(command: string, update: Update) {
    const _command = this._find(command);
    if (_command) {
      const _context = new Context(update, this._telegram);
      _command.handler(_context);
    }
  }

  /** Handle update */
  private _handleUpdate(update: Update): void {
    this._logger.info(`Processing update ${update.update_id}`);

    if (update?.message?.text !== undefined) {
      const _text = update.message.text;

      // If command
      if (
        _text.length > 1 &&
        _text.length < 33 &&
        _text.startsWith(Constants.Command.Prefix)
      ) {
        const command = _text.substr(1);
        this._handleCommand(command, update);
      }
    }
  }

  /** Handle updates */
  private _handleUpdates(updates: Update[]): void {
    updates.forEach(this._handleUpdate.bind(this));
  }

  /** Fetch updates */
  private async _fetchUpdates(): Promise<void> {
    const _updates = await this._telegram.getUpdates(
      this._offset,
      this._allowedUpdates,
    );

    this._handleUpdates(_updates);

    if (_updates.length > 0) {
      this._offset = _updates[_updates.length - 1].update_id + 1;
    }

    if (this._polling) {
      await this._fetchUpdates();
    }
  }

  /** Launch bot */
  public async launch(): Promise<void> {
    const _botInfo = await this._telegram.getMe();

    this._logger.info(`Launching ${_botInfo.username}`);

    this._polling = true;
    await this._fetchUpdates();
  }

  /** Stop bot */
  public stop(): void {
    this._polling = false;
  }
}
