import { IMovieResponse } from "../../../services";
import { IMovie } from "./IMovie";

/**
 * Interface for object that describing the Movies state
 * The state is modified from API response
 */
export interface IMoviesState extends Omit<IMovieResponse, "data"> {
  /**
   * Movies
   */
  movies: Array<IMovie>;

  /**
   * Movies per page
   */
  limit: number;

  /**
   * Total amount
   */
  totalAmount: number;

  /**
   * Offset
   */
  offset: number;
}
