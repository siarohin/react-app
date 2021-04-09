import { ActionsObservable, combineEpics, ofType, StateObservable } from "redux-observable";
import { of as observableOf } from "rxjs";
import { mapTo, map, switchMap, filter } from "rxjs/operators";
import isNil from "lodash/isNil";

import {
  MoviesActions,
  MoviesModels,
  SharedModels,
  State,
  UserPreferencesActions,
  UserPreferencesModels
} from "../store";

function shouldUpdateSelected(
  state: UserPreferencesModels.IUserPreferencesState,
  selectedMovie: MoviesModels.IMovie
): boolean {
  return state.selectedMovie.id === selectedMovie.id;
}

/**
 * Effect for processing UPDATE_SELECTED_GENRE, UPDATE_SELECTED_SORTING_OPTION actions
 * As the order of calling reducer and effect is guaranted we update state and dispatch LOAD_MOVIES action
 */
const updateUserPreferences$ = (
  action$: ActionsObservable<SharedModels.ActionWithPayload<{ selected: string }>>,
  state$: StateObservable<State>
) =>
  action$.pipe(
    ofType(
      UserPreferencesActions.updateSelectedGenre,
      UserPreferencesActions.updateSelectedSortingOption,
      UserPreferencesActions.updateSearchValue,
      UserPreferencesActions.updateOffset
    ),
    switchMap(() => {
      const userPreferencesState: UserPreferencesModels.IUserPreferencesState = state$.value.userPreferences;
      return observableOf(
        !!userPreferencesState.genres.selected &&
          !!userPreferencesState.sortingOptions.selected &&
          !isNil(userPreferencesState.search.selected)
      );
    }),
    filter((isInitialized) => !!isInitialized),
    mapTo(MoviesActions.loadMovies())
  );

/**
 * Effect for processing UPDATE_MOVIE_SUCCESS actions
 */
const updateSelectedMovie$ = (
  action$: ActionsObservable<SharedModels.ActionWithPayload<any>>,
  state$: StateObservable<State>
) =>
  action$.pipe(
    ofType(MoviesActions.updateMovieSuccess),
    switchMap(({ payload }) => {
      const userPreferencesState: UserPreferencesModels.IUserPreferencesState = state$.value.userPreferences;
      const selectedMovie: MoviesModels.IMovie = payload?.movie;
      const shouldUpdate: boolean = shouldUpdateSelected(userPreferencesState, selectedMovie);
      return observableOf({ shouldUpdate, selectedMovie });
    }),
    filter(({ shouldUpdate }) => shouldUpdate),
    map(({ selectedMovie }) => UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie }))
  );

/**
 * Effect for processing DELETE_MOVIE_SUCCESS actions
 */
const deleteSelectedMovie$ = (
  action$: ActionsObservable<SharedModels.ActionWithPayload<any>>,
  state$: StateObservable<State>
) =>
  action$.pipe(
    ofType(MoviesActions.deleteMovieSuccess),
    switchMap(({ payload }) => {
      const userPreferencesState: UserPreferencesModels.IUserPreferencesState = state$.value.userPreferences;
      const shouldUpdate: boolean = shouldUpdateSelected(userPreferencesState, payload?.movie);
      return observableOf(shouldUpdate);
    }),
    filter((shouldUpdate) => shouldUpdate),
    mapTo(UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie: {} as MoviesModels.IMovie }))
  );

export const userPreferencesEffects = combineEpics(updateUserPreferences$, updateSelectedMovie$, deleteSelectedMovie$);
