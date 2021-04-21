import { Action } from "@reduxjs/toolkit";
import assign from "lodash/assign";

import { IMovieData } from "../../services";
import { IMovie, IMoviesState } from "./models";
import * as MoviesActions from "./movies.actions";
import { INITIAL_STATE, reducer as movieListReducer } from "./movies.reducer";

describe("Core.Store.Movies.moviesReducer", () => {
  let state: IMoviesState;

  const movie: IMovie = {
    title: "Test",
    tagline: "",
    voteAverage: 1,
    voteCount: 2,
    releaseDate: "testDate",
    posterPath: "",
    overview: "",
    budget: 10000,
    revenue: 20,
    runtime: 120,
    genres: ["All"],
    id: 100,
    hasError: false
  };

  const data: IMovieData = {
    movies: [movie],
    limit: 30,
    offset: 0,
    totalAmount: 30000
  };

  beforeEach(() => {
    state = assign({}, INITIAL_STATE);
  });

  it("should return initial state when state is undefined", () => {
    const expected: IMoviesState = INITIAL_STATE;

    expect(movieListReducer(undefined, <Action>{})).toBe(expected);
  });

  it("should set state on loadMoviesSuccess", () => {
    const expected: IMoviesState = { ...state, ...data };

    expect(movieListReducer(state, MoviesActions.loadMoviesSuccess({ data }))).toEqual(expected);
  });

  it("should add movie and increase totalAmount on createMovieSuccess", () => {
    const expected: IMoviesState = {
      ...state,
      movies: [...state.movies, movie],
      totalAmount: state.totalAmount + 1
    };

    expect(movieListReducer(state, MoviesActions.createMovieSuccess({ movie }))).toEqual(expected);
  });

  it("should update movies on updateMovieSuccess", () => {
    state = { ...state, ...data };
    const updatedMovie: IMovie = { ...movie, title: "Changed title" };

    const expected: IMoviesState = {
      ...state,
      movies: [updatedMovie]
    };

    expect(movieListReducer(state, MoviesActions.updateMovieSuccess({ movie: updatedMovie }))).toEqual(expected);
  });

  it("should delete movie and decrease totalAmount on deleteMovieSuccess", () => {
    state = { ...state, ...data };

    const expected: IMoviesState = {
      ...state,
      movies: [],
      totalAmount: state.totalAmount - 1
    };

    expect(movieListReducer(state, MoviesActions.deleteMovieSuccess({ movie }))).toEqual(expected);
  });
});
