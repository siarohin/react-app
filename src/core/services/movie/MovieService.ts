import { Observable } from "rxjs";
import { map as observableMap } from "rxjs/operators";
import keys from "lodash/keys";
import map from "lodash/map";

import { transformCamelToSnakeCase, transformSnakeToCamelCase } from "../../../utils";
import { MoviesModels } from "../../store";
import { MovieResponse } from "./models";
import { MovieRepository } from "./MovieRepository";

/**
 * Movie service
 */
export class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  private getMovieByModel(movie: MovieResponse): MoviesModels.IMovie {
    const INITIAL_VALUE: MoviesModels.IMovie = {} as MoviesModels.IMovie;
    return keys(movie).reduce(
      (movieKeys, key) => ({ ...movieKeys, [transformSnakeToCamelCase(key)]: movie?.[key as keyof MovieResponse] }),
      INITIAL_VALUE
    ) as MoviesModels.IMovie;
  }

  private getMovieRequestByModel(movie: MoviesModels.IMovie): MovieResponse {
    const INITIAL_VALUE: MovieResponse = {} as MovieResponse;
    return keys(movie).reduce(
      (movieKeys, key) => ({
        ...movieKeys,
        [transformCamelToSnakeCase(key)]: movie?.[key as keyof MoviesModels.IMovie]
      }),
      INITIAL_VALUE
    ) as MovieResponse;
  }

  /**
   * Get movies list
   */
  public getMovies(): Observable<Array<MoviesModels.IMovie>> {
    return this.movieRepository
      .getMovies()
      .pipe(observableMap((response) => map(response, (movie) => this.getMovieByModel(movie))));
  }

  /**
   * Create movie
   */
  public createMovie(movie: Omit<MoviesModels.IMovie, "id">): Observable<MoviesModels.IMovie> {
    return this.movieRepository
      .createMovie(this.getMovieRequestByModel(movie as MoviesModels.IMovie))
      .pipe(observableMap((response) => this.getMovieByModel(response)));
  }

  /**
   * Update movie
   */
  public updateMovie(movie: MoviesModels.IMovie): Observable<MoviesModels.IMovie> {
    return this.movieRepository
      .updateMovie(this.getMovieRequestByModel(movie))
      .pipe(observableMap((response) => this.getMovieByModel(response)));
  }

  /**
   * Delete movie
   */
  public deleteMovie(movie: MoviesModels.IMovie): Observable<MoviesModels.IMovie> {
    return this.movieRepository
      .deleteMovie(this.getMovieRequestByModel(movie))
      .pipe(observableMap((response) => this.getMovieByModel(response)));
  }
}
