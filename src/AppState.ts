import values from "lodash/values";

import { FILTER_GENRES, FilterOptions, MoviesModels } from "./core";
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
  },
  genres: {
    all: [...FILTER_GENRES],
    selected: ""
  },
  sortingOptions: {
    options: values(FilterOptions),
    selected: ""
  }
};
