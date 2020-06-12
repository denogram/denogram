// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Voice note.
 * Ref: https://core.telegram.org/bots/api#voice
 */
export interface Voice {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size */
  file_size?: number;
}
