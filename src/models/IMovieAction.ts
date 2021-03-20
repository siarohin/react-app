import { DialogAction, MoviesModels } from "../core";

/**
 * Interface for action
 */
export interface IMovieAction {
  /**
   * Movie action
   */
  action: DialogAction;

  /**
   * Movie card
   */
  movie?: MoviesModels.IMovie;
}
