import React, { ComponentType, ReactElement } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  SharedModels,
  MetaTitle,
  Endpoints
} from "../../core";
import { useComponentDidMount } from "../../hooks";
import { MovieCard } from "../../components";
import { getSearchValueFromPath } from "../../utils";
import NoMovies from "../../components/NoMovies";

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
  const { pathname } = useLocation();

  // Fix for `Nested or latter components will override duplicate changes` with react-helmet
  const isMoviePath: boolean = pathname.match(/\/film/)?.[0] === RouterPath.Movie;
  const hasMoviesLength = movies?.length > 0;

  useComponentDidMount(() => {
    const isInitialLoading: boolean = isNil(searchValue) && isEmpty(movies);

    if (isInitialLoading) {
      const selected: string = getSearchValueFromPath(search);
      dispatch(UserPreferencesActions.updateSearchValue({ selected }));
    }
  });

  const handleEditableAction = (dialogAction: UserPreferencesModels.IMovieAction): void => {
    dispatch(UserPreferencesActions.updateDialogAction({ dialogAction }));
  };

  const handleMovieClick = (selectedMovie: MoviesModels.IMovie): void => {
    dispatch(UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie }));
    history.push(`${RouterPath.Movie}/${selectedMovie.id}`);
  };

  const MoviesContainer = ({ helmet }: { helmet: ReactElement<typeof Helmet> }): ReactElement => {
    return (
      <>
        {isMoviePath ? null : helmet}
        <Grid item container xs={12} spacing={2}>
          {map(movies, (movie) => (
            <Grid key={movie?.id} item xs={4}>
              <MovieCard onClick={handleMovieClick} editableAction={handleEditableAction} movie={movie} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const NoMoviesContainer = ({ helmet }: { helmet: ReactElement<typeof Helmet> }): ReactElement => {
    return (
      <>
        {isMoviePath ? null : helmet}
        <NoMovies />
      </>
    );
  };

  return hasMoviesLength ? (
    <MoviesContainer
      helmet={
        <Helmet>
          <title>
            {search
              ? `${getSearchValueFromPath(search)?.toUpperCase()} - ${movies?.length} ${MetaTitle.SearchResult}`
              : MetaTitle.Search}
          </title>
          <link
            rel="canonical"
            href={`${Endpoints.ClientHost}${RouterPath.Search}/${encodeURI(getSearchValueFromPath(search))}`}
          />
        </Helmet>
      }
    />
  ) : (
    <NoMoviesContainer
      helmet={
        <Helmet>
          <title>{`${getSearchValueFromPath(search)?.toUpperCase()} - ${MetaTitle.NoMovies}`}</title>
          <link
            rel="canonical"
            href={`${Endpoints.ClientHost}${RouterPath.Search}/${encodeURI(getSearchValueFromPath(search))}`}
          />
        </Helmet>
      }
    />
  );
};

const mapStateToProps = (state: State): { movies: Array<MoviesModels.IMovie>; searchValue: string } => ({
  movies: state.movieList.movies,
  searchValue: state.userPreferences.search.selected
});

export default connect(mapStateToProps)(MoviesList as ComponentType<any>);
