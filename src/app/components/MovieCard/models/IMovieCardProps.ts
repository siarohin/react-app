import { MoviesModels } from "../../../core";
import { IMovieUpsertAction } from "../../../shared";

/**
 * Interface for MovieCard props
 */
export interface IMovieCardProps extends IMovieUpsertAction {
  /**
   * Movie card
   */
  movie: MoviesModels.IMovie;

  /**
   * Callback fired when the component requests to be clicked.
   */
  onClick: (movie: MoviesModels.IMovie) => void;
}
