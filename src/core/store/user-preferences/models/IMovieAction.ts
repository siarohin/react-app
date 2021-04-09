import { DialogAction } from "../../../constants";
import { MoviesModels } from "../../movies";
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
