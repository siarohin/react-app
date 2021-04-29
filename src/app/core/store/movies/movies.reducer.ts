import { Action, createReducer } from "@reduxjs/toolkit";

import { IMovie, IMoviesState } from "./models";
import * as MovieActions from "./movies.actions";

export const INITIAL_STATE: IMoviesState = {
  movies: [],
  limit: 0,
  offset: 0,
  totalAmount: (undefined as unknown) as number
};

const moviesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    // Load
    .addCase(MovieActions.loadMoviesSuccess, (state, { payload }) => ({
      ...state,
      ...payload.data
    }))
    // Create
    .addCase(MovieActions.createMovieSuccess, (state, { payload }) => ({
      ...state,
      movies: [...state.movies, payload.movie],
      totalAmount: state.totalAmount + 1
    }))
    // Update
    .addCase(MovieActions.updateMovieSuccess, (state, { payload }) => {
      const index: number = state.movies.findIndex((movie) => movie.id === payload.movie.id);
      const movies: Array<IMovie> = [...state.movies.slice(0, index), payload.movie, ...state.movies.slice(index + 1)];
      return {
        ...state,
        movies
      };
    })
    // Delete
    .addCase(MovieActions.deleteMovieSuccess, (state, { payload }) => {
      const index: number = state.movies.findIndex((movie) => movie.id === payload.movie.id);
      const movies: Array<IMovie> = [...state.movies.slice(0, index), ...state.movies.slice(index + 1)];
      return {
        ...state,
        movies,
        totalAmount: state.totalAmount - 1
      };
    });
});

export function reducer(state: IMoviesState = INITIAL_STATE, action: Action): IMoviesState {
  return moviesReducer(state, action);
}
