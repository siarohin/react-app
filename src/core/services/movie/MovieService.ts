import { Observable } from "rxjs";
import { map as observableMap } from "rxjs/operators";
import keys from "lodash/keys";
import map from "lodash/map";
import omit from "lodash/omit";

import { getEnumKey, transformCamelToSnakeCase, transformSnakeToCamelCase } from "../../../utils";
import { FilterOptions, FilterOptionsQuery } from "../../../core";
import { MoviesModels } from "../../store";
import { IMovieData, IMovieResponseData, IMoviesRequestQuery } from "./models";
import { MovieRepository } from "./MovieRepository";

/**
 * Movie service
 */
export class MovieService {
  private static getMovieByModel(movie: IMovieResponseData): MoviesModels.IMovie {
    const INITIAL_VALUE: MoviesModels.IMovie = {} as MoviesModels.IMovie;
    return keys(movie).reduce(
      (movieKeys, key) => ({
        ...movieKeys,
        [transformSnakeToCamelCase(key)]: movie?.[key as keyof IMovieResponseData]
      }),
      INITIAL_VALUE
    ) as MoviesModels.IMovie;
  }

  private static getMovieRequestByModel(movie: MoviesModels.IMovie): IMovieResponseData {
    const INITIAL_VALUE: IMovieResponseData = {} as IMovieResponseData;
    return keys(movie).reduce(
      (movieKeys, key) => ({
        ...movieKeys,
        [transformCamelToSnakeCase(key)]: movie?.[key as keyof MoviesModels.IMovie]
      }),
      INITIAL_VALUE
    ) as IMovieResponseData;
  }

  private static getQueries(query: IMoviesRequestQuery): string {
    const INITIAL_VALUE: string = "";
    return keys(query).reduce((queries, key) => {
      let currentQuery: string = "";
      const shouldUpdateQuery: boolean = !!query?.[key as keyof IMoviesRequestQuery];

      if (shouldUpdateQuery) {
        switch (key) {
          case "sortBy":
            currentQuery =
              FilterOptionsQuery[
                getEnumKey(FilterOptions, query[key as keyof IMoviesRequestQuery] as string) as "releaseDate" | "rating"
              ];
            break;
          default:
            currentQuery = query[key as keyof IMoviesRequestQuery] as string;
            break;
        }
      }

      if (key === "search") {
        return queries + key + "=" + currentQuery + "&";
      }

      return queries + key + "=" + currentQuery.replace(/ /g, "_").toLowerCase() + "&";
    }, INITIAL_VALUE);
  }

  /**
   * Get movies list
   */
  public static getMovies(query?: IMoviesRequestQuery): Observable<IMovieData> {
    return MovieRepository.getMovies(this.getQueries(query!)).pipe(
      observableMap((response) => {
        const movies: Array<MoviesModels.IMovie> = map(response?.data, (movie) => this.getMovieByModel(movie));
        return { ...omit(response, ["data"]), movies };
      })
    );
  }

  /**
   * Get movie by id
   */
  public static getMovieById(id: string): Observable<MoviesModels.IMovie> {
    return MovieRepository.getMovieById(id).pipe(observableMap((response) => this.getMovieByModel(response)));
  }

  /**
   * Create movie
   */
  public static createMovie(movie: Omit<MoviesModels.IMovie, "id">): Observable<MoviesModels.IMovie> {
    return MovieRepository.createMovie(this.getMovieRequestByModel(movie as MoviesModels.IMovie)).pipe(
      observableMap((response) => this.getMovieByModel(response))
    );
  }

  /**
   * Update movie
   */
  public static updateMovie(movie: MoviesModels.IMovie): Observable<MoviesModels.IMovie> {
    return MovieRepository.updateMovie(this.getMovieRequestByModel(movie)).pipe(
      observableMap((response) => this.getMovieByModel(response))
    );
  }

  /**
   * Delete movie
   */
  public static deleteMovie(movie: MoviesModels.IMovie): Observable<MoviesModels.IMovie> {
    return MovieRepository.deleteMovie(this.getMovieRequestByModel(movie)).pipe(
      observableMap((response) => this.getMovieByModel(response))
    );
  }
}
