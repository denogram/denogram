// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PhotoSize } from "./photo_size.ts";

/**
 * General file (as opposed to photos, voice messages and audio files).
 * Ref: https://core.telegram.org/bots/api#document
 */
export interface Document {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** Document thumbnail as defined by sender */
  thumb?: PhotoSize;
  /** Original filename as defined by sender */
  file_name?: string;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size */
  file_size?: number;
}
