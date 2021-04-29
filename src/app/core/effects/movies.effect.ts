import { ActionsObservable, combineEpics, ofType, StateObservable } from "redux-observable";
import { of as observableOf } from "rxjs";
import { switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { DeleteMovieMsg, UpsertMovieMsg } from "../constants";
import { MovieService } from "../services";
import {
  MoviesActions,
  SharedModels,
  State,
  ToastActions,
  UserPreferencesActions,
  UserPreferencesModels
} from "../store";
import { notifyObservable, getQueryParams } from "./common.util";

/**
 * Effect for processing LOAD_MOVIES action
 */
const loadMovies$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>, state$: StateObservable<State>) =>
  action$
    .pipe(
      ofType(MoviesActions.loadMovies),
      switchMap(() => {
        const userPreferencesState: UserPreferencesModels.IUserPreferencesState = state$.value.userPreferences;
        return MovieService.getMovies(getQueryParams(userPreferencesState)).pipe(
          switchMap((data) => [MoviesActions.loadMoviesSuccess({ data }), MoviesActions.loadMoviesComplete()]),
          catchError(() => observableOf(MoviesActions.loadMoviesFail(), MoviesActions.loadMoviesComplete()))
        );
      })
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

/**
 * Effect for processing LOAD_MOVIE_BY_ID action
 */
const loadMovieById$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$
    .pipe(
      ofType(MoviesActions.loadMovieById),
      switchMap(({ payload }) => {
        return MovieService.getMovieById(payload.id).pipe(
          map((selectedMovie) => UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie })),
          catchError(() => observableOf(UserPreferencesActions.updateSelectedMovieFail()))
        );
      })
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

/**
 * Effect for processing CREATE_MOVIE action
 */
const createMovie$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$
    .pipe(
      ofType(MoviesActions.createMovie),
      switchMap(({ payload }) =>
        MovieService.createMovie(payload.movie).pipe(
          switchMap((movie) => [
            MoviesActions.createMovieSuccess({ movie }),
            ToastActions.showSuccessToast({ message: UpsertMovieMsg.Success })
          ]),
          catchError(() => observableOf(ToastActions.showFailToast({ message: UpsertMovieMsg.Fail })))
        )
      )
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

/**
 * Effect for processing UPDATE_MOVIE action
 */
const updateMovie$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$
    .pipe(
      ofType(MoviesActions.updateMovie),
      switchMap(({ payload }) =>
        MovieService.updateMovie(payload.movie).pipe(
          switchMap((movie) => [
            MoviesActions.updateMovieSuccess({ movie }),
            ToastActions.showSuccessToast({ message: UpsertMovieMsg.Success })
          ]),
          catchError(() => observableOf(ToastActions.showFailToast({ message: UpsertMovieMsg.Fail })))
        )
      )
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

/**
 * Effect for processing DELETE_MOVIE action
 */
const deleteMovie$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$
    .pipe(
      ofType(MoviesActions.deleteMovie),
      switchMap(({ payload }) =>
        MovieService.deleteMovie(payload.movie).pipe(
          switchMap((movie) => [
            MoviesActions.deleteMovieSuccess({ movie }),
            ToastActions.showSuccessToast({ message: DeleteMovieMsg.Success })
          ]),
          catchError(() => observableOf(ToastActions.showFailToast({ message: DeleteMovieMsg.Fail })))
        )
      )
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

export const movieEffects = combineEpics(loadMovies$, loadMovieById$, createMovie$, updateMovie$, deleteMovie$);
