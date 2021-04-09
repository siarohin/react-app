import React, { ComponentType, ReactElement } from "react";
import { connect } from "react-redux";

import "./MoviesFilter.scss";
import { FilterButtons, FilterCount, FilterSelect } from "../../components";
import { SharedModels, UserPreferencesModels, UserPreferencesActions, MoviesModels, State } from "../../core";
import { PaginationLayout } from "../PaginationLayout";

const MoviesFilter = (
  props: Partial<MoviesModels.IMoviesState> & UserPreferencesModels.IUserPreferencesState & SharedModels.IDispatchAction
): ReactElement => {
  const { totalAmount, genres, sortingOptions, dispatch } = props;

  const handleSelectedGenre = (selected: string) => {
    if (genres.selected !== selected) {
      dispatch(UserPreferencesActions.updateSelectedGenre({ selected }));
    }
  };

  const handleChangeSorting = (selected: string) => {
    if (sortingOptions.selected !== selected) {
      dispatch(UserPreferencesActions.updateSelectedSortingOption({ selected }));
    }
  };

  return (
    <div className="app-movies-filter">
      <div className="app-movies-filter__tab-panel">
        <FilterButtons selected={handleSelectedGenre} genres={genres} />
      </div>
      <div className="app-movies-filter__select-panel">
        <FilterSelect changeSorting={handleChangeSorting} sortingOptions={sortingOptions} />
      </div>
      <div className="app-movies-filter__count">{totalAmount ? <FilterCount count={totalAmount!} /> : null}</div>
      <div className="app-movies-filter__pagination">{<PaginationLayout />}</div>
      <div className="app-movies-filter__separator"></div>
    </div>
  );
};

const mapStateToProps = (
  state: State
): Partial<MoviesModels.IMoviesState> & Partial<UserPreferencesModels.IUserPreferencesState> => {
  return {
    totalAmount: state.movieList.totalAmount,
    genres: state.userPreferences.genres,
    sortingOptions: state.userPreferences.sortingOptions
  };
};

export default connect(mapStateToProps)(MoviesFilter as ComponentType<any>);
