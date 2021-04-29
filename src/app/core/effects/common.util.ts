import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { ActionsObservable, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

import { DEFAULT_GENRE, isServer, MOVIES_PER_PAGE, SEARCH_BY, SORTING_ORDER } from "../constants";
import { IMovieResponseData, IMoviesRequestQuery } from "../services";
import { MoviesModels, SharedModels, UserPreferencesModels } from "../store";

/**
 * Use `notifyObservable` with takeUntil to complete effects when specific action was dispatched
 * Doesn't complete Observable for SPA
 */
export const notifyObservable = (
  action$: ActionsObservable<SharedModels.ActionWithPayload<any>>,
  actionType: ActionCreatorWithoutPayload<any>
): Observable<any> =>
  action$.pipe(
    ofType(actionType),
    filter(() => isServer)
  );

/**
 * Condition for updating selected movie
 */
export const shouldUpdateSelected = (
  state: UserPreferencesModels.IUserPreferencesState,
  selectedMovie: MoviesModels.IMovie
): boolean => {
  return state.selectedMovie.id === selectedMovie.id;
};

/**
 * Returns query params for get movies request
 */
export const getQueryParams = (
  userPreferencesState: UserPreferencesModels.IUserPreferencesState
): IMoviesRequestQuery => ({
  filter: userPreferencesState.genres.selected === DEFAULT_GENRE ? "" : userPreferencesState.genres.selected,
  sortBy: userPreferencesState.sortingOptions.selected as keyof IMovieResponseData,
  sortOrder: SORTING_ORDER,
  limit: `${MOVIES_PER_PAGE}`,
  search: userPreferencesState.search.selected,
  searchBy: SEARCH_BY,
  offset: userPreferencesState.offset.selected
});
