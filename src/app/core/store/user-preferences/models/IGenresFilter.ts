import { IGenres } from "./IGenres";
import { ISortingOptions } from "./ISortingOptions";

/**
 * Interface for genres filter
 */
export interface IGenresFilter {
  /**
   * Genres
   */
  genres: IGenres;

  /**
   * Count of filtered movies
   */
  count: string;

  /**
   * Sorting options
   */
  sortingOptions: ISortingOptions;

  /**
   * Callback fired when the component requests to change selected genre.
   */
  selected: (selected: string) => void;

  /**
   * Callback fired when the component requests to change selected option.
   */
  changeSorting: (selected: string) => void;
}
