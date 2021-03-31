import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, mapTo } from "rxjs/operators";

import { Endpoints } from "../../constants";
import { IMovieResponse, IMovieResponseData } from "./models";

const header: any = {
  "Content-Type": "application/json"
};

/**
 * Movie repository service
 */
export class MovieRepository {
  /**
   * Get movies list
   */
  public getMovies(query?: string): Observable<IMovieResponse> {
    return ajax
      .get(`${Endpoints.AppHost}/${query ? "movies?" + query : "movies"}`)
      .pipe(map(({ response }) => response));
  }

  /**
   * Create movie
   */
  public createMovie(request: Omit<IMovieResponseData, "id">): Observable<IMovieResponseData> {
    return ajax.post(`${Endpoints.AppHost}/movies`, request, header).pipe(map(({ response }) => response));
  }

  /**
   * Update movie
   */
  public updateMovie(request: IMovieResponseData): Observable<IMovieResponseData> {
    return ajax.put(`${Endpoints.AppHost}/movies`, request, header).pipe(map(({ response }) => response));
  }

  /**
   * Delete movie
   */
  public deleteMovie(request: IMovieResponseData): Observable<IMovieResponseData> {
    return ajax.delete(`${Endpoints.AppHost}/movies/${request.id}`).pipe(mapTo(request));
  }
}