// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Location } from "./location.ts";

/**
 * Venue.
 * Ref: https://core.telegram.org/bots/api#venue
 */
export interface Venue {
  /** Venue location */
  location: Location;
  /** Name of the venue */
  title: string;
  /** Address of the venue */
  address: string;
  /** Foursquare identifier of the venue */
  foursquare_id?: string;
  /**
   * Foursquare type of the venue.
   * For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/ice cream”.
   */
  foursquare_type: string;
}
