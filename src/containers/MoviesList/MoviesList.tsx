import React, { ComponentType, ReactElement } from "react";
import { connect } from "react-redux";
import map from "lodash/map";

import { Grid } from "../../shared";
import { MoviesModels, State, UserPreferencesActions, SharedModels } from "../../core";
import { MovieCard } from "../../components";
import { IMoviesListProps } from "./models";

const MoviesList = (
  props: Partial<MoviesModels.IMoviesState> & IMoviesListProps & SharedModels.IDispatchAction
): ReactElement<IMoviesListProps> => {
  const { movies, dispatch, editableAction } = props;

  const handleMovieClick = (selectedMovie: MoviesModels.IMovie): void => {
    dispatch(UserPreferencesActions.updateSelectedMovie({ selectedMovie }));
  };

  return (
    <Grid item container xs={12} spacing={2}>
      {map(movies, (movie) => (
        <Grid key={movie?.id} item xs={4}>
          <MovieCard onClick={handleMovieClick} editableAction={editableAction} movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state: State): Partial<MoviesModels.IMoviesState> => ({
  movies: state.movieList.movies
});

export default connect(mapStateToProps)(MoviesList as ComponentType<any>);
