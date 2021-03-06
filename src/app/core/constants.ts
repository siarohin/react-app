/**
 * App name
 */
export const APP_NAME: string = "React movie";

/**
 * Meta
 */
export const META_CHARSET: string = "utf-8";

export enum MetaTitle {
  DefaultTitle = "The Best Movies to watch",
  MovieDetails = "The Best Movie",
  NotFound = "Page not found",
  NoMovies = "No movies found",
  Search = "Must-Watch Movies",
  SearchResult = "Best Movies of All Time"
}

/**
 * Dialog actions
 */
export enum DialogAction {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete"
}

/**
 * Dialog titles
 */
export enum DialogTitle {
  CREATE = "Add movie",
  UPDATE = "Edit movie",
  DELETE = "Delete movie"
}

/**
 * Selectable filter options
 */
export enum FilterOptions {
  rating = "Rating",
  releaseDate = "Release date"
}

/**
 * Queries that are used in the filter request
 */
export enum FilterOptionsQuery {
  rating = "vote_average",
  releaseDate = "release_date"
}

/**
 * Filter genres
 */
export const FILTER_GENRES: Array<string> = ["Comedy", "Crime", "Documentary", "Drama", "Horror", "Romance"];

/**
 * Default filter value
 */
export const DEFAULT_GENRE: string = "All";

/**
 * All the backend API endpoint URIs are listed here.
 */
export enum Endpoints {
  // REST APIs:
  AppHost = "http://localhost:4000",
  ClientHost = "http://localhost:9001"
}

/**
 * Movies per page
 */
export const MOVIES_PER_PAGE: number = 30;

/**
 * Sorting order
 */
export const SORTING_ORDER: "asc" | "desc" = "desc";

/**
 * Search option
 */
export const SEARCH_BY: "title" | "genres" = "title";

/**
 * Upsert movie messages enum
 */
export enum UpsertMovieMsg {
  Success = "The movie has been successfully saved.",
  Fail = "The movie could not be saved."
}

/**
 * Delete movie messages enum
 */
export enum DeleteMovieMsg {
  Fail = "The movie could not be deleted.",
  Success = "The movie has been successfully deleted."
}

/**
 * Router path enum
 */
export enum RouterPath {
  NotFound = "/page-not-found",
  NoMovies = "/movies-not-found",
  Movie = "/film",
  Search = "/search"
}

/**
 * Define node env
 */
export const isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);
