import fetch from "cross-fetch";
import { from as observableFrom, Observable } from "rxjs";
import { mapTo, take } from "rxjs/operators";

import { Endpoints, META_CHARSET } from "../../constants";
import { IMovieResponse, IMovieResponseData } from "./models";

export const headers: HeadersInit = {
  "Content-Type": `application/json;charset=${META_CHARSET}`
};

function getResponse(response: Response, result?: Promise<any>): Promise<any> {
  const isNotSuccess: boolean = !response.ok;

  if (isNotSuccess) {
    throw Error;
  }

  return result || response.json();
}

/**
 * Movie repository service
 */
export class MovieRepository {
  /**
   * Get movies list
   */
  public static getMovies(query?: string): Observable<IMovieResponse> {
    return observableFrom(
      fetch(`${Endpoints.AppHost}/${query ? "movies?" + query : "movies"}`, {
        method: "GET",
        headers
      }).then((res) => getResponse(res))
    ).pipe(take(1));
  }

  /**
   * Get movie by id
   */
  public static getMovieById(id: string): Observable<IMovieResponseData> {
    return observableFrom(
      fetch(`${Endpoints.AppHost}/movies/${id}`, {
        method: "GET",
        headers
      }).then((res) => getResponse(res))
    ).pipe(take(1));
  }

  /**
   * Create movie
   */
  public static createMovie(request: Omit<IMovieResponseData, "id">): Observable<IMovieResponseData> {
    return observableFrom(
      fetch(`${Endpoints.AppHost}/movies`, {
        method: "POST",
        headers,
        body: JSON.stringify(request)
      }).then((res) => getResponse(res))
    ).pipe(take(1));
  }

  /**
   * Update movie
   */
  public static updateMovie(request: IMovieResponseData): Observable<IMovieResponseData> {
    return observableFrom(
      fetch(`${Endpoints.AppHost}/movies`, {
        method: "PUT",
        headers,
        body: JSON.stringify(request)
      }).then((res) => getResponse(res))
    ).pipe(take(1));
  }

  /**
   * Delete movie
   */
  public static deleteMovie(request: IMovieResponseData): Observable<IMovieResponseData> {
    return observableFrom(
      fetch(`${Endpoints.AppHost}/movies/${request.id}`, {
        method: "DELETE"
      }).then((res) => getResponse(res, Promise.resolve()))
    ).pipe(mapTo(request), take(1));
  }
}
