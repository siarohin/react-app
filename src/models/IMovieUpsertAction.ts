import { IMovieAction } from "./IMovieAction";

/**
 * Interface for upsert/delete movie action
 */
export interface IMovieUpsertAction {
  /**
   * Editable action
   */
  editableAction: (action: IMovieAction) => void;
}
