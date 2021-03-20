import React, { ReactElement, useEffect, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";

import "./MovieDetails.scss";
import { getFullYear } from "../../utils";
import { IMovieDetails } from "../../models";

export const MovieDetails = (props: IMovieDetails): ReactElement<IMovieDetails> => {
  const { movie } = props;

  const containerRef = useRef((null as unknown) as HTMLDivElement);

  useEffect(() => containerRef.current?.scrollIntoView({ behavior: "smooth" }), [movie]);

  const onClose = () => props?.handleClose();

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
