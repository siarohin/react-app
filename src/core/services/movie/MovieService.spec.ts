import { of as observableOf } from "rxjs";
import keys from "lodash/keys";
import omit from "lodash/omit";

import { transformSnakeToCamelCase } from "../../../utils";
import { MoviesModels } from "../../store";
import { MovieRepository } from "./MovieRepository";
import { IMovieResponseData } from "./models";
import { MovieService } from "./MovieService";

const getMovieByModelHelper = (movie: IMovieResponseData): MoviesModels.IMovie => {
  return keys(movie).reduce(
    (movieKeys, key) => ({
      ...movieKeys,
      [transformSnakeToCamelCase(key)]: movie?.[key as keyof IMovieResponseData]
    }),
    {}
  ) as MoviesModels.IMovie;
};

describe("Core.Services.Movie.MovieService", () => {
  const movie: IMovieResponseData = {
    title: "Test",
    tagline: "",
    vote_average: 1,
    vote_count: 2,
    release_date: "testDate",
    poster_path: "",
    overview: "",
    budget: 10000,
    revenue: 20,
    runtime: 120,
    genres: ["All"],
    id: 100
  };

  const query: any = {
    sortOrder: "desc",
    sortBy: "Rating",
    search: "Top 100 movie"
  };

  it("should create", () => {
    expect(MovieService).toBeTruthy();
  });

  it("getMovies should return movies", async () => {
    const response: Array<IMovieResponseData> = [movie];
    const spy: any = jest.spyOn(MovieRepository, "getMovies");
    spy.mockReturnValue(observableOf(response));

    const expected: Array<MoviesModels.IMovie> = [getMovieByModelHelper(movie)];
    const expectedRequest: string = "sortOrder=desc&sortBy=vote_average&search=Top 100 movie&";

    await MovieService.getMovies(query).subscribe((dp) => expect(dp).toEqual(expected));
    expect(spy).toHaveBeenCalledWith(expectedRequest);
  });

  it("getMovieById should return movie with selected id", async () => {
    const id: string = `${movie.id}`;
    const spy: any = jest.spyOn(MovieRepository, "getMovieById");
    spy.mockReturnValue(observableOf(movie));

    const expected: MoviesModels.IMovie = getMovieByModelHelper(movie);

    await MovieService.getMovieById(id).subscribe((dp) => expect(dp).toEqual(expected));
    expect(spy).toHaveBeenCalledWith(id);
  });

  it("createMovie should create movie", async () => {
    const spy: any = jest.spyOn(MovieRepository, "createMovie");
    spy.mockReturnValue(observableOf(movie));

    const expected: MoviesModels.IMovie = getMovieByModelHelper(movie);
    const expectedRequest: Omit<IMovieResponseData, "id"> = omit(movie, ["id"]);

    await MovieService.createMovie(omit(getMovieByModelHelper(movie), ["id"])).subscribe((dp) =>
      expect(dp).toEqual(expected)
    );
    expect(spy).toHaveBeenCalledWith(expectedRequest);
  });

  it("updateMovie should update movie", async () => {
    const spy: any = jest.spyOn(MovieRepository, "updateMovie");
    spy.mockReturnValue(observableOf(movie));

    const expected: MoviesModels.IMovie = getMovieByModelHelper(movie);
    const expectedRequest: IMovieResponseData = movie;

    await MovieService.updateMovie(expected).subscribe((dp) => expect(dp).toEqual(expected));
    expect(spy).toHaveBeenCalledWith(expectedRequest);
  });

  it("deleteMovie should delete and return deleted movie", async () => {
    const spy: any = jest.spyOn(MovieRepository, "deleteMovie");
    spy.mockReturnValue(observableOf(movie));

    const expected: MoviesModels.IMovie = getMovieByModelHelper(movie);
    const expectedRequest: IMovieResponseData = movie;

    await MovieService.deleteMovie(expected).subscribe((dp) => expect(dp).toEqual(expected));
    expect(spy).toHaveBeenCalledWith(expectedRequest);
  });
});
