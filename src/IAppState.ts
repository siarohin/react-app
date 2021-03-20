import { IMovieDialog, IGenres, ISortingOptions } from "./models";

/**
 * Interface for app state
 */
export interface IAppState {
  /**
   * Settings for dialog render
   */
  movieDialog: Omit<IMovieDialog, "onClose" | "onSubmit" | "onDelete">;

  /**
   * Movie genres list
   */
  genres: IGenres;

  /**
   * Movie sorting option list
   */
  sortingOptions: ISortingOptions;
}
