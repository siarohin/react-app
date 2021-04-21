import { NotificationsState } from "react-notification-system-redux";

import { State, getMovieListState, getUserPreferencesState } from "./reducers";
import { INITIAL_STATE as movieList } from "./movies";
import { INITIAL_STATE as userPreferences } from "./user-preferences";

describe("Core.Store.reducers", () => {
  const state: State = {
    movieList,
    userPreferences,
    notifications: {} as NotificationsState
  };

  it("should return movieListState on getMovieListState call", () => {
    expect(getMovieListState(state)).toEqual(state.movieList);
  });

  it("should return userPreferencesState on getUserPreferencesState call", () => {
    expect(getUserPreferencesState(state)).toEqual(state.userPreferences);
  });
});
