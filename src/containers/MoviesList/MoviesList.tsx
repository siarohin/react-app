import React, { ComponentType, ReactElement } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import map from "lodash/map";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

import { Grid } from "../../shared";
import {
  MoviesModels,
  State,
  UserPreferencesActions,
  RouterPath,
  UserPreferencesModels,
  SharedModels
} from "../../core";
import { useComponentDidMount } from "../../hooks";
import { MovieCard, NoMovies } from "../../components";

const MoviesList = ({
  movies,
  searchValue,
  dispatch
}: {
  movies: Array<MoviesModels.IMovie>;
  searchValue: string;
  dispatch: (action: SharedModels.ActionWithPayload<any>) => ActionCreatorWithoutPayload;
}): ReactElement => {
  const history = useHistory();
  const { search } = useParams<{ search: string }>();

  useComponentDidMount(() => {
    const isInitialLoading: boolean = isNil(searchValue) && isEmpty(movies);

    if (isInitialLoading) {
      const value: string = search?.replace("Search", "") || "";
      dispatch(UserPreferencesActions.updateSearchValue({ selected: value?.trim() }));
    }
  });

  const handleEditableAction = (dialogAction: UserPreferencesModels.IMovieAction): void => {
    dispatch(UserPreferencesActions.updateDialogAction({ dialogAction }));
  };

  const handleMovieClick = (selectedMovie: MoviesModels.IMovie): void => {
    dispatch(UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie }));
    history.push(`${RouterPath.Movie}/${selectedMovie.id}`);
  };

  return movies?.length > 0 ? (
    <Grid item container xs={12} spacing={2}>
      {map(movies, (movie) => (
        <Grid key={movie?.id} item xs={4}>
          <MovieCard onClick={handleMovieClick} editableAction={handleEditableAction} movie={movie} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <NoMovies />
  );
};

const mapStateToProps = (state: State): { movies: Array<MoviesModels.IMovie>; searchValue: string } => ({
  movies: state.movieList.movies,
  searchValue: state.userPreferences.search.selected
});

export default connect(mapStateToProps)(MoviesList as ComponentType<any>);
