import { IMovieDialog } from "./models";

/**
 * Interface for app state
 */
export interface IAppState {
  /**
   * Settings for dialog render
   */
  movieDialog: Omit<IMovieDialog, "onClose" | "onSubmit" | "onDelete">;
}
