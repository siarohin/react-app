import { Action, createReducer } from "@reduxjs/toolkit";
import values from "lodash/values";

import { IUserPreferencesState } from "./models";
import { DEFAULT_GENRE, DialogAction, FilterOptions, FILTER_GENRES } from "../../constants";
import * as UserPreferencesActions from "./user-preferences.actions";
import { MoviesModels } from "../movies";

export const INITIAL_STATE: IUserPreferencesState = {
  genres: {
    all: [...FILTER_GENRES],
    selected: DEFAULT_GENRE
  },
  sortingOptions: {
    options: values(FilterOptions),
    selected: FilterOptions.rating
  },
  search: {
    selected: (undefined as unknown) as string
  },
  offset: {
    selected: "0"
  },
  selectedMovie: {} as MoviesModels.IMovie,
  dialogAction: {
    action: (undefined as unknown) as DialogAction,
    movie: {} as MoviesModels.IMovie
  }
};

const userPreferencesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    // Genres
    .addCase(UserPreferencesActions.updateSelectedGenre, (state, { payload }) => ({
      ...state,
      genres: { ...state.genres, selected: payload.selected },
      offset: { ...state.offset, selected: "0" }
    }))
    // Sorting options
    .addCase(UserPreferencesActions.updateSelectedSortingOption, (state, { payload }) => ({
      ...state,
      sortingOptions: { ...state.sortingOptions, selected: payload.selected }
    }))
    // Search
    .addCase(UserPreferencesActions.updateSearchValue, (state, { payload }) => ({
      ...state,
      search: { ...state.search, selected: payload.selected },
      offset: { ...state.offset, selected: "0" }
    }))
    // Offset
    .addCase(UserPreferencesActions.updateOffset, (state, { payload }) => ({
      ...state,
      offset: { ...state.offset, selected: payload.selected }
    }))
    // Update selected movie
    .addCase(UserPreferencesActions.updateSelectedMovieSuccess, (state, { payload }) => ({
      ...state,
      selectedMovie: payload.selectedMovie
    }))
    .addCase(UserPreferencesActions.updateSelectedMovieFail, (state) => ({
      ...state,
      selectedMovie: { hasError: true } as MoviesModels.IMovie
    }))
    // Update dialog action
    .addCase(UserPreferencesActions.updateDialogAction, (state, { payload }) => ({
      ...state,
      dialogAction: payload.dialogAction
    }));
});

export function reducer(state: IUserPreferencesState = INITIAL_STATE, action: Action): IUserPreferencesState {
  return userPreferencesReducer(state, action);
}
