import { Action, createReducer } from "@reduxjs/toolkit";

import { IMoviesState } from "./models";
import * as MovieActions from "./movies.actions";

export const INITIAL_STATE: IMoviesState = {
  movies: [],
  isLoading: false
};

const moviesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    // Load
    .addCase(MovieActions.loadMovies, (state) => ({
      ...state,
      isLoading: true
    }))
    .addCase(MovieActions.loadMoviesSuccess, (state, { payload }) => ({
      ...state,
      movies: payload.movies,
      isLoading: false
    }))
    .addCase(MovieActions.loadMoviesFail, (state) => ({
      ...state,
      isLoading: false
    }))
    // Create
    .addCase(MovieActions.createMovieSuccess, (state, { payload }) => ({
      ...state,
      movies: [...state.movies, payload.movie]
    }))
    .addCase(MovieActions.createMovieFail, (state) => ({
      ...state
    }))
    // Update
    .addCase(MovieActions.updateMovieSuccess, (state, { payload }) => ({
      ...state,
      movies: [...state.movies.filter((movie) => movie.id !== payload.movie.id), payload.movie]
    }))
    .addCase(MovieActions.updateMovieFail, (state) => ({
      ...state
    }))
    // Delete
    .addCase(MovieActions.deleteMovieSuccess, (state, { payload }) => ({
      ...state,
      movies: [...state.movies.filter((movie) => movie.id !== payload.movie.id)]
    }))
    .addCase(MovieActions.deleteMovieFail, (state) => ({
      ...state
    }));
});

export function reducer(state: IMoviesState = INITIAL_STATE, action: Action): IMoviesState {
  return moviesReducer(state, action);
}
