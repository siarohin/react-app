import { IMovie } from "./IMovie";

/**
 * Interface for object that describing the Movies state
 */
export interface IMoviesState {
  /**
   * Movies
   */
  movies: Array<IMovie>;

  /**
   * If movies on loading
   */
  isLoading: boolean;
}
