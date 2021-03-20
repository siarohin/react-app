import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, mapTo } from "rxjs/operators";

import { Endpoints } from "../../constants";
import { MovieResponse } from "./models";

/**
 * Movie repository service
 */
export class MovieRepository {
  /**
   * Get movies list
   */
  public getMovies(): Observable<Array<MovieResponse>> {
    return ajax.get(`${Endpoints.AppHost}/movies`).pipe(map(({ response }) => response?.data));
  }

  /**
   * Create movie
   */
  public createMovie(request: Omit<MovieResponse, "id">): Observable<MovieResponse> {
    return ajax
      .post(`${Endpoints.AppHost}/movies`, request, { "Content-Type": "application/json" })
      .pipe(map(({ response }) => response));
  }

  /**
   * Update movie
   */
  public updateMovie(request: MovieResponse): Observable<MovieResponse> {
    return ajax
      .put(`${Endpoints.AppHost}/movies`, request, { "Content-Type": "application/json" })
      .pipe(map(({ response }) => response));
  }

  /**
   * Delete movie
   */
  public deleteMovie(request: MovieResponse): Observable<MovieResponse> {
    return ajax.delete(`${Endpoints.AppHost}/movies/${request.id}`).pipe(mapTo(request));
  }
}
