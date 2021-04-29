import { MoviesModels } from "../../core";

/**
 * Interface for dialog settings
 */
export interface IDialogSettings {
  /**
   * Dialog title
   */
  title: string;

  /**
   * Dialog values
   */
  values: MoviesModels.IMovie;
}
