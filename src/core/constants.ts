/**
 * App name
 */
export const APP_NAME: string = "React movie";

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
  releaseDate = "Release date",
  title = "Title",
  budget = "Budget"
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
  AppHost = "http://localhost:4000"
}
