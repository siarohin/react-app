import { createAction } from "@reduxjs/toolkit";

import { MoviesModels } from "../movies";
import { IMovieAction } from "./models";

/**
 * UPDATE_SELECTED_GENRE
 */
export const updateSelectedGenre = createAction<{ selected: string }>("[ReactMovie] UPDATE_SELECTED_GENRE");

/**
 * UPDATE_SELECTED_SORTING_OPTION
 */
export const updateSelectedSortingOption = createAction<{ selected: string }>(
  "[ReactMovie] UPDATE_SELECTED_SORTING_OPTION"
);

/**
 * UPDATE_SEARCH_VALUE
 */
export const updateSearchValue = createAction<{ selected: string }>("[ReactMovie] UPDATE_SEARCH_VALUE");

/**
 * UPDATE_OFFSET
 */
export const updateOffset = createAction<{ selected: string }>("[ReactMovie] UPDATE_OFFSET");

/**
 * UPDATE_SELECTED_MOVIE
 */
export const updateSelectedMovieSuccess = createAction<{ selectedMovie: MoviesModels.IMovie }>(
  "[ReactMovie] UPDATE_SELECTED_MOVIE_SUCCESS"
);

export const updateSelectedMovieFail = createAction("[ReactMovie] UPDATE_SELECTED_MOVIE_FAIL");

/**
 * UPDATE_DIALOG_ACTION
 */
export const updateDialogAction = createAction<{ dialogAction: IMovieAction }>("[ReactMovie] UPDATE_DIALOG_ACTION");
