/**
 * Interface for movie card
 */
export interface IMovie {
  /**
   * Movie title
   */
  title: string;

  /**
   * Movie tagline
   */
  tagline: string;

  /**
   * Movie average raiting
   */
  voteAverage: number;

  /**
   * Total count of votes for the movie
   */
  voteCount: number;

  /**
   * Movie release date
   */
  releaseDate: string;

  /**
   * Url to the poster image
   */
  posterPath: string;

  /**
   * Short description of the movie
   */
  overview: string;

  /**
   * Movie production budget
   */
  budget: number;

  /**
   * Movie revenue
   */
  revenue: number;

  /**
   * Movie duration time
   */
  runtime: number;

  /**
   * List of genres
   */
  genres: Array<string>;

  /**
   * Movie unique identifier
   */
  id: number;

  /**
   * Error state
   */
  hasError?: boolean;
}
