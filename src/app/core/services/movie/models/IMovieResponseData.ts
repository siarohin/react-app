/**
 * Interface for IMovie response data
 */
export interface IMovieResponseData {
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
  vote_average: number;

  /**
   * Total count of votes for the movie
   */
  vote_count: number;

  /**
   * Movie release date
   */
  release_date: string;

  /**
   * Url to the poster image
   */
  poster_path: string;

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
}
