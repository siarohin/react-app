import { combineReducers, ReducersMapObject } from "redux";
import { NotificationsState, reducer as notificationsReducer } from "react-notification-system-redux";

import { reducer as movieListReducer, MoviesModels } from "./movies";
import { reducer as userPreferencesReducer, UserPreferencesModels } from "./user-preferences";

/**
 * This interface defines the state property.
 */
export interface State {
  movieList: MoviesModels.IMoviesState;
  userPreferences: UserPreferencesModels.IUserPreferencesState;
  notifications: NotificationsState;
}

/**
 * Defines the reducer mapping for the state.
 */
export const reducers = combineReducers<ReducersMapObject<State>>({
  movieList: movieListReducer,
  userPreferences: userPreferencesReducer,
  notifications: notificationsReducer
});

/**
 * This function takes the root state and selects the `movieList` property of the state tree.
 */
export const getMovieListState: (state: State) => MoviesModels.IMoviesState = (state: State) => state.movieList;

/**
 * This function takes the root state and selects the `userPreferences` property of the state tree.
 */
export const getUserPreferencesState: (state: State) => UserPreferencesModels.IUserPreferencesState = (state: State) =>
  state.userPreferences;
