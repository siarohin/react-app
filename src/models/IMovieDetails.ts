import { MoviesModels } from "../core";

/**
 * Interface for MovieDetails
 */
export interface IMovieDetails {
  /**
   * Movie card
   */
  movie: MoviesModels.IMovie;

  /**
   * Callback fired when the component requests to be closed.
   */
  handleClose: () => void;
}
