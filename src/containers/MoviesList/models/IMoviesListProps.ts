import { MoviesModels } from "../../../core";
import { IMovieUpsertAction } from "../../../models";

/**
 * Interface for MoviesList props
 */
export interface IMoviesListProps extends IMovieUpsertAction {
  /**
   * List of movie cards
   */
  movies: Array<MoviesModels.IMovie>;

  /**
   * Is loading
   */
  isLoading: boolean;

  /**
   * Callback fired when the component requests to be clicked.
   */
  handleMovieClick: (movie: MoviesModels.IMovie) => void;
}
