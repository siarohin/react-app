import { ActionsObservable, combineEpics, ofType, StateObservable } from "redux-observable";
import { of as observableOf } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import { DEFAULT_GENRE, DeleteMovieMsg, MOVIES_PER_PAGE, SEARCH_BY, SORTING_ORDER, UpsertMovieMsg } from "../constants";
import { IMovieResponseData, IMoviesRequestQuery, MovieService } from "../services";
import { MoviesActions, SharedModels, State, ToastActions, UserPreferencesModels } from "../store";

const movieService: MovieService = new MovieService();

/**
 * Returns query params for get movies request
 */
const getQueryParams = (userPreferencesState: UserPreferencesModels.IUserPreferencesState): IMoviesRequestQuery => ({
  filter: userPreferencesState.genres.selected === DEFAULT_GENRE ? "" : userPreferencesState.genres.selected,
  sortBy: userPreferencesState.sortingOptions.selected as keyof IMovieResponseData,
  sortOrder: SORTING_ORDER,
  limit: `${MOVIES_PER_PAGE}`,
  search: userPreferencesState.search.selected,
  searchBy: SEARCH_BY,
  offset: userPreferencesState.offset.selected
});

/**
 * Effect for processing LOAD_MOVIES action
 */
const loadMovies$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>, state$: StateObservable<State>) =>
  action$.pipe(
    ofType(MoviesActions.loadMovies),
    switchMap(() => {
      const userPreferencesState: UserPreferencesModels.IUserPreferencesState = state$.value.userPreferences;
      return movieService.getMovies(getQueryParams(userPreferencesState)).pipe(
        map((data) => MoviesActions.loadMoviesSuccess({ data })),
        catchError(() => observableOf(MoviesActions.loadMoviesFail()))
      );
    })
  );

/**
 * Effect for processing CREATE_MOVIE action
 */
const createMovie$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.createMovie),
    switchMap(({ payload }) =>
      movieService.createMovie(payload.movie).pipe(
        switchMap((movie) => [
          MoviesActions.createMovieSuccess({ movie }),
          ToastActions.showSuccessToast({ message: UpsertMovieMsg.Success })
        ]),
        catchError(() => observableOf(ToastActions.showFailToast({ message: UpsertMovieMsg.Fail })))
      )
    )
  );

/**
 * Effect for processing UPDATE_MOVIE action
 */
const updateMovie$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.updateMovie),
    switchMap(({ payload }) =>
      movieService.updateMovie(payload.movie).pipe(
        switchMap((movie) => [
          MoviesActions.updateMovieSuccess({ movie }),
          ToastActions.showSuccessToast({ message: UpsertMovieMsg.Success })
        ]),
        catchError(() => observableOf(ToastActions.showFailToast({ message: UpsertMovieMsg.Fail })))
      )
    )
  );

/**
 * Effect for processing DELETE_MOVIE action
 */
const deleteMovie$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.deleteMovie),
    switchMap(({ payload }) =>
      movieService.deleteMovie(payload.movie).pipe(
        switchMap((movie) => [
          MoviesActions.deleteMovieSuccess({ movie }),
          ToastActions.showSuccessToast({ message: DeleteMovieMsg.Success })
        ]),
        catchError(() => observableOf(ToastActions.showFailToast({ message: DeleteMovieMsg.Fail })))
      )
    )
  );

export const movieEffects = combineEpics(loadMovies$, createMovie$, updateMovie$, deleteMovie$);
