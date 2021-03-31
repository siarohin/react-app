import { IMovieResponseData } from "./IMovieResponseData";

/**
 * Interface for Movies reques parameters
 */
export interface IMoviesRequestQuery {
  /**
   * Field to sort by
   */
  sortBy?: keyof IMovieResponseData;

  /**
   * Value to define sort direction - 'desc' or 'asc'
   */
  sortOrder?: "desc" | "asc";

  /**
   * Search value
   */
  search?: string;

  /**
   * Type of search (title or genres)
   */
  searchBy?: "title" | "genres";

  /**
   * Value to filter by genres
   */
  filter?: string;

  /**
   * Offset in result array for pagination
   */
  offset?: string;

  /**
   * Limit amount of items in result array for pagination
   */
  limit?: string;
}
