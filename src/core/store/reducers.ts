import { combineReducers, ReducersMapObject } from "redux";

import { reducer as movieListReducer, MoviesModels } from "./movies";

/**
 * This interface defines the state property.
 */
export interface State {
  movieList: MoviesModels.IMoviesState;
}

/**
 * Defines the reducer mapping for the state.
 */
export const reducers = combineReducers<ReducersMapObject<State>>({ movieList: movieListReducer });

/**
 * This function takes the root state and selects the `movieList` property of the state tree.
 */
export const getMovieListState: (state: State) => MoviesModels.IMoviesState = (state: State) => state.movieList;
