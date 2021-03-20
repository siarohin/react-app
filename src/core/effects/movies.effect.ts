import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { of as observableOf } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import { MovieService } from "../services";
import { MoviesActions, MoviesModels } from "../store";

const movieService: MovieService = new MovieService();

/**
 * Effect for processing LOAD_MOVIES action
 */
const loadMovies$ = (action$: ActionsObservable<MoviesModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.loadMovies),
    switchMap(() =>
      movieService.getMovies().pipe(
        map((movies) => MoviesActions.loadMoviesSuccess({ movies })),
        catchError(() => observableOf(MoviesActions.loadMoviesFail()))
      )
    )
  );

/**
 * Effect for processing CREATE_MOVIE action
 */
const createMovie$ = (action$: ActionsObservable<MoviesModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.createMovie),
    switchMap(({ payload }) =>
      movieService.createMovie(payload.movie).pipe(
        map((movie) => MoviesActions.createMovieSuccess({ movie })),
        catchError(() => observableOf(MoviesActions.createMovieFail()))
      )
    )
  );

/**
 * Effect for processing UPDATE_MOVIE action
 */
const updateMovie$ = (action$: ActionsObservable<MoviesModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.updateMovie),
    switchMap(({ payload }) =>
      movieService.updateMovie(payload.movie).pipe(
        map((movie) => MoviesActions.updateMovieSuccess({ movie })),
        catchError(() => observableOf(MoviesActions.updateMovieFail()))
      )
    )
  );

/**
 * Effect for processing DELETE_MOVIE action
 */
const deleteMovie$ = (action$: ActionsObservable<MoviesModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(MoviesActions.deleteMovie),
    switchMap(({ payload }) =>
      movieService.deleteMovie(payload.movie).pipe(
        map((movie) => MoviesActions.deleteMovieSuccess({ movie })),
        catchError(() => observableOf(MoviesActions.deleteMovieFail()))
      )
    )
  );

export const movieEffects = combineEpics(loadMovies$, createMovie$, updateMovie$, deleteMovie$);
