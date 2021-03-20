import React, { ReactElement, useState } from "react";

import { MoviesModels } from "../core";
import { MovieDetails } from "../containers";
import { IMovieDetails } from "../models";

/**
 * Change header hook
 */
export function useHeader<T>(
  initialElement: ReactElement<T>
): [ReactElement<T> | ReactElement<IMovieDetails>, (movie?: MoviesModels.IMovie | undefined) => void] {
  const [header, setHeader] = useState(initialElement);

  const updateHeader = (movie?: MoviesModels.IMovie) => {
    const element: ReactElement = movie ? <MovieDetails movie={movie} handleClose={updateHeader} /> : initialElement;
    setHeader(element);
  };

  return [header, updateHeader];
}
