import { createAction } from "@reduxjs/toolkit";

import { IMovieData } from "../../services";
import { IMovie } from "./models";

/**
 * LOAD_MOVIES
 */
export const loadMovies = createAction("[ReactMovie] LOAD_MOVIES");

export const loadMoviesSuccess = createAction<{ data: IMovieData }>("[ReactMovie] LOAD_MOVIES_SUCCESS");

export const loadMoviesFail = createAction("[ReactMovie] LOAD_MOVIES_FAIL");

/**
 * LOAD_MOVIE_BY_ID
 */
export const loadMovieById = createAction<{ id: string }>("[ReactMovie] LOAD_MOVIE_BY_ID");

/**
 * CREATE_MOVIE
 */
export const createMovie = createAction<{ movie: Omit<IMovie, "id"> }>("[ReactMovie] CREATE_MOVIE");

export const createMovieSuccess = createAction<{ movie: IMovie }>("[ReactMovie] CREATE_MOVIE_SUCCESS");

export const createMovieFail = createAction("[ReactMovie] CREATE_MOVIE_FAIL");

/**
 * UPDATE_MOVIE
 */
export const updateMovie = createAction<{ movie: IMovie }>("[ReactMovie] UPDATE_MOVIE");

export const updateMovieSuccess = createAction<{ movie: IMovie }>("[ReactMovie] UPDATE_MOVIE_SUCCESS");

export const updateMovieFail = createAction("[ReactMovie] UPDATE_MOVIE_FAIL");

/**
 * DELETE_MOVIE
 */
export const deleteMovie = createAction<{ movie: IMovie }>("[ReactMovie] DELETE_MOVIE");

export const deleteMovieSuccess = createAction<{ movie: IMovie }>("[ReactMovie] DELETE_MOVIE_SUCCESS");

export const deleteMovieFail = createAction("[ReactMovie] DELETE_MOVIE_FAIL");
