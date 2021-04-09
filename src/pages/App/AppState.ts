import { MoviesModels } from "../../core";
import { IAppState } from "./IAppState";

/**
 * App state
 */
export const AppState: IAppState = {
  movieDialog: {
    dialogSettings: {
      title: "",
      values: {} as MoviesModels.IMovie
    },
    open: false
  }
};
