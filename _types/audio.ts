// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PhotoSize } from "./photo_size.ts";

/**
 * Audio file to be treated as music by the Telegram clients.
 * Ref: https://core.telegram.org/bots/api#audio
 */
export interface Audio {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots.
   * Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** Performer of the audio as defined by sender or by audio tags */
  performer?: string;
  /** Title of the audio as defined by sender or by audio tags */
  title?: string;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size */
  file_size?: number;
  /** Thumbnail of the album cover to which the music file belongs */
  thumb?: PhotoSize;
}
