// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PhotoSize } from "./photo_size.ts";

/**
 * Video message.
 * Ref: https://core.telegram.org/bots/api#videonote
 */
export interface VideoNote {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** Video width and height (diameter of the video message) as defined by sender */
  length: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Video thumbnail */
  thumb?: PhotoSize;
  /** File size */
  file_size?: number;
}
