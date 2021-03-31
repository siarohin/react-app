import React, { ComponentType, ReactElement, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./MovieDetails.scss";
import { IconButton, SearchIcon } from "../../shared";
import { MoviesModels, UserPreferencesActions, SharedModels } from "../../core";
import { getFullYear } from "../../utils";
import { IMovieDetails } from "../../models";

const MovieDetails = (props: IMovieDetails & SharedModels.IDispatchAction): ReactElement<IMovieDetails> => {
  const { movie, dispatch } = props;

  const containerRef = useRef((null as unknown) as HTMLDivElement);

  useEffect(() => containerRef.current?.scrollIntoView({ behavior: "smooth" }), [movie]);

  const onClose = (): void => {
    const selectedMovie: MoviesModels.IMovie = {} as MoviesModels.IMovie;
    dispatch(UserPreferencesActions.updateSelectedMovie({ selectedMovie }));
  };

  return (
    <>
      <div ref={containerRef} className="app-header__top-right">
        <IconButton className="app-movie-details__icon-button" onClick={onClose}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="app-movie-details">
        <div className="app-movie-details__poster" style={{ backgroundImage: "url(" + movie?.posterPath + ")" }}></div>
        <div className="app-movie-detils__content">
          <h3 className="app-movie-details__title">{movie?.title}</h3>
          {movie?.voteAverage ? <div className="app-movie-details__rate">{movie?.voteAverage}</div> : null}
          <div className="app-movie-details__pre-description">
            <span className="app-movie-details__pre-description-item">{getFullYear(movie?.releaseDate)}</span>
            <span className="app-movie-details__pre-description-item">{movie?.runtime} min</span>
          </div>
          <div className="app-movie-details__description">{movie?.overview}</div>
        </div>
      </div>
    </>
  );
};

export default connect()(MovieDetails as ComponentType<any>);
