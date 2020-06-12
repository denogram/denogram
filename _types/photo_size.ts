// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * One size of a photo or file / sticker thumbnail.
 * Ref: https://core.telegram.org/bots/api#photosize
 */
export interface PhotoSize {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** Photo width */
  width: number;
  /** Photo height */
  height: number;
  /** File size */
  file_size?: number;
}
