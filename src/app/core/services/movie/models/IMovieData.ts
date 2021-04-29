import { MoviesModels } from "../../../store";
import { IMovieResponse } from "./IMovieResponse";
/**
 * Interface for MovieData
 */
export interface IMovieData extends Omit<IMovieResponse, "data"> {
  /**
   * Array of movie list
   */
  movies: Array<MoviesModels.IMovie>;
}
