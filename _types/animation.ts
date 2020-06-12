// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PhotoSize } from "./photo_size.ts";

/**
 * Animation file (GIF or H.264/MPEG-4 AVC video without sound).
 * Ref: https://core.telegram.org/bots/api#animation
 */
export interface Animation {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** Video width as defined by sender */
  width: number;
  /** Video height as defined by sender */
  height: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Animation thumbnail as defined by sender */
  thumb: PhotoSize;
  /** Original animation filename as defined by sender */
  file_name: string;
  /** MIME type of the file as defined by sender */
  mime_type: string;
  /** File size */
  file_size: number;
}
