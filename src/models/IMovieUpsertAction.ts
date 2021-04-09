import { UserPreferencesModels } from "../core";

/**
 * Interface for upsert/delete movie action
 */
export interface IMovieUpsertAction {
  /**
   * Editable action
   */
  editableAction: (action: UserPreferencesModels.IMovieAction) => void;
}
