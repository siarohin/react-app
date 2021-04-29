import { MoviesModels, UserPreferencesModels } from "../../core";
import { IDialogSettings } from "./IDialogSettings";

/**
 * Interface for MovieDialog
 */
export interface IMovieDialog {
  /**
   * Provides from Material UI. If true, the Dialog is open.
   */
  open: boolean;

  /**
   * Dialog settings
   */
  dialogSettings: IDialogSettings;

  /**
   * Genres list
   */
  genres?: UserPreferencesModels.IGenres;

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: () => void;

  /**
   * Callback fired when the component requests to submit changes.
   */
  onSubmit: (movie: MoviesModels.IMovie) => void;

  /**
   * Callback fired when the component requests to delete movie.
   */
  onDelete: (movie: MoviesModels.IMovie) => void;
}
