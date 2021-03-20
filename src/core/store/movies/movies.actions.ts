import { createAction } from "@reduxjs/toolkit";

import { IMovie } from "./models";

/**
 * LOAD_MOVIES
 */
export const loadMovies = createAction("[ReactMovie] LOAD_MOVIES");

export const loadMoviesSuccess = createAction<{ movies: Array<IMovie> }>("[ReactMovie] LOAD_MOVIES_SUCCESS");

export const loadMoviesFail = createAction("[WelReactMovie] LOAD_MOVIES_FAIL");

/**
 * CREATE_MOVIE
 */
export const createMovie = createAction<{ movie: Omit<IMovie, "id"> }>("[ReactMovie] CREATE_MOVIE");

export const createMovieSuccess = createAction<{ movie: IMovie }>("[ReactMovie] CREATE_MOVIE_SUCCESS");

export const createMovieFail = createAction("[WelReactMovie] CREATE_MOVIE_FAIL");

/**
 * UPDATE_MOVIE
 */
export const updateMovie = createAction<{ movie: IMovie }>("[ReactMovie] UPDATE_MOVIE");

export const updateMovieSuccess = createAction<{ movie: IMovie }>("[ReactMovie] UPDATE_MOVIE_SUCCESS");

export const updateMovieFail = createAction("[WelReactMovie] UPDATE_MOVIE_FAIL");

/**
 * DELETE_MOVIE
 */
export const deleteMovie = createAction<{ movie: IMovie }>("[ReactMovie] DELETE_MOVIE");

export const deleteMovieSuccess = createAction<{ movie: IMovie }>("[ReactMovie] DELETE_MOVIE_SUCCESS");

export const deleteMovieFail = createAction("[WelReactMovie] DELETE_MOVIE_FAIL");
