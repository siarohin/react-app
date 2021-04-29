import { IMovieResponseData } from "./IMovieResponseData";

/**
 * Interface for MovieResponse
 */
export interface IMovieResponse {
  /**
   * Array of movie datas
   */
  data: Array<IMovieResponseData>;

  /**
   * Movies per page
   */
  limit: number;

  /**
   * Offset
   */
  offset: number;

  /**
   * Amount of movies
   */
  totalAmount: number;
}
