import { Action } from "@reduxjs/toolkit";
import assign from "lodash/assign";

import { DialogAction, FilterOptions } from "../../constants";
import { IMovie } from "../movies/models";
import { IMovieAction, IUserPreferencesState } from "./models";
import * as UserPreferencesActions from "./user-preferences.actions";
import { INITIAL_STATE, reducer as userPreferencesReducer } from "./user-preferences.reducer";

describe("Core.Store.UserPreferences.userPreferencesReducer", () => {
  let state: IUserPreferencesState;

  beforeEach(() => {
    state = assign({}, INITIAL_STATE);
  });

  it("should return initial state when state is undefined", () => {
    const expected: IUserPreferencesState = INITIAL_STATE;

    expect(userPreferencesReducer(undefined, <Action>{})).toBe(expected);
  });

  it("should update genres and reset selected offset on updateSelectedGenre", () => {
    const selected: string = "Comedy";

    const expected: IUserPreferencesState = {
      ...state,
      genres: { ...state.genres, selected },
      offset: { ...state.offset, selected: "0" }
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateSelectedGenre({ selected }))).toEqual(expected);
  });

  it("should update sorting options on updateSelectedSortingOption", () => {
    const selected: string = FilterOptions.releaseDate;

    const expected: IUserPreferencesState = {
      ...state,
      sortingOptions: { ...state.sortingOptions, selected }
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateSelectedSortingOption({ selected }))).toEqual(
      expected
    );
  });

  it("should update search value and reset selected offset on updateSearchValue", () => {
    const selected: string = "Top 2021 movies";

    const expected: IUserPreferencesState = {
      ...state,
      search: { ...state.search, selected },
      offset: { ...state.offset, selected: "0" }
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateSearchValue({ selected }))).toEqual(expected);
  });

  it("should update offset on updateOffset", () => {
    const selected: string = "100";

    const expected: IUserPreferencesState = {
      ...state,
      offset: { ...state.offset, selected }
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateOffset({ selected }))).toEqual(expected);
  });

  it("should update selected movie on updateSelectedMovieSuccess", () => {
    const selectedMovie: IMovie = {
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

    const expected: IUserPreferencesState = {
      ...state,
      selectedMovie
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie }))).toEqual(
      expected
    );
  });

  it("should set error on updateSelectedMovieFail", () => {
    const expected: IUserPreferencesState = {
      ...state,
      selectedMovie: { hasError: true } as IMovie
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateSelectedMovieFail())).toEqual(expected);
  });

  it("should update dialog action on updateDialogAction", () => {
    const dialogAction: IMovieAction = {
      action: DialogAction.CREATE
    };

    const expected: IUserPreferencesState = {
      ...state,
      dialogAction
    };

    expect(userPreferencesReducer(state, UserPreferencesActions.updateDialogAction({ dialogAction }))).toEqual(
      expected
    );
  });
});
