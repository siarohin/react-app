import { MoviesModels } from "../../movies";
import { IGenres } from "./IGenres";
import { IOffset } from "./IOffset";
import { ISearch } from "./ISearch";
import { ISortingOptions } from "./ISortingOptions";

/**
 * Interface for object that describing the User preferences state
 * The state is modified from user actions
 */
export interface IUserPreferencesState {
  /**
   * Genres
   */
  genres: IGenres;

  /**
   * Sorting options
   */
  sortingOptions: ISortingOptions;

  /**
   * Search form
   */
  search: ISearch;

  /**
   * Offset
   */
  offset: IOffset;

  /**
   * Selected movie by user
   */
  selectedMovie: MoviesModels.IMovie;
}
