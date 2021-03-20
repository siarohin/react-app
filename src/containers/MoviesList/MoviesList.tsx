import React, { ReactElement } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import map from "lodash/map";

import "./MoviesList.scss";
import { MovieCard } from "../../components";
import { IMoviesListProps } from "./models";

export const MoviesList = (props: IMoviesListProps): ReactElement<IMoviesListProps> => {
  const { movies, handleMovieClick, editableAction, isLoading } = props;

  if (isLoading) {
    return <CircularProgress className="app-movies-list__progress-bar" />;
  }

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
