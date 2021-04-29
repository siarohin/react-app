import React, { ComponentType, ReactElement, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import "./MovieDetails.scss";
import { IconButton, SearchIcon, CircularProgress, IMovieDetails } from "../../shared";
import {
  MoviesModels,
  UserPreferencesActions,
  SharedModels,
  State,
  MoviesActions,
  RouterPath,
  MetaTitle,
  Endpoints
} from "../../core";
import { useComponentWillMount } from "../../hooks";
import { getFullYear, getPath } from "../../utils";

const MovieDetails = ({
  movie,
  searchValue,
  dispatch
}: {
  movie: MoviesModels.IMovie;
  searchValue: string;
  dispatch: (action: SharedModels.ActionWithPayload<any>) => ActionCreatorWithoutPayload;
}): ReactElement<IMovieDetails> => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const containerRef = useRef((null as unknown) as HTMLDivElement);

  useComponentWillMount(() => {
    if (isEmpty(movie)) {
      dispatch(MoviesActions.loadMovieById({ id }));
    }
  });

  if (movie?.hasError) {
    history.push(RouterPath.NotFound);
  }

  useEffect(() => containerRef.current?.scrollIntoView({ behavior: "smooth" }), [movie]);

  const onClose = (): void => {
    const selectedMovie: MoviesModels.IMovie = {} as MoviesModels.IMovie;
    const value: string = searchValue?.trim();

    dispatch(UserPreferencesActions.updateSelectedMovieSuccess({ selectedMovie }));
    history.push(getPath(value));
  };

  return (
    <>
      <Helmet>
        <title>{`${movie?.title} - ${MetaTitle.MovieDetails} in ${getFullYear(movie?.releaseDate)}`}</title>
        <link rel="canonical" href={`${Endpoints.ClientHost}${RouterPath.Movie}/${movie?.id}`} />
      </Helmet>

      <div ref={containerRef} className="app-header__top-right">
        <IconButton className="app-movie-details__icon-button" onClick={onClose}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="app-movie-details">
        {isEmpty(movie) ? (
          <CircularProgress className="app__progress-bar" size="8rem" color="secondary" />
        ) : (
          <>
            <div
              className="app-movie-details__poster"
              style={{ backgroundImage: "url(" + movie?.posterPath + ")" }}
            ></div>
            <div className="app-movie-detils__content">
              <h3 className="app-movie-details__title">{movie?.title}</h3>
              {movie?.voteAverage ? <div className="app-movie-details__rate">{movie?.voteAverage}</div> : null}
              <div className="app-movie-details__pre-description">
                <span className="app-movie-details__pre-description-item">{getFullYear(movie?.releaseDate)}</span>
                <span className="app-movie-details__pre-description-item">{movie?.runtime} min</span>
              </div>
              <div className="app-movie-details__description">{movie?.overview}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: State): { movie: MoviesModels.IMovie; searchValue: string } => {
  return {
    movie: state.userPreferences.selectedMovie,
    searchValue: state.userPreferences.search.selected
  };
};

export default connect(mapStateToProps)(MovieDetails as ComponentType<any>);
