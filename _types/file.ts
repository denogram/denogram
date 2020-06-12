// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * File ready to be downloaded.
 * The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>.
 * It is guaranteed that the link will be valid for at least 1 hour.
 * When the link expires, a new one can be requested by calling getFile.
 * Ref: https://core.telegram.org/bots/api#file
 */
export interface File {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** File size */
  file_size?: number;
  /**
   * File path.
   * Use https://api.telegram.org/file/bot<token>/<file_path> to get the file.
   */
  file_path?: string;
}
