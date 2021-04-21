import { ajax } from "rxjs/ajax";
import { of as observableOf } from "rxjs";

import { Endpoints } from "../../constants";
import { MoviesModels } from "../../store";
import { header, MovieRepository } from "./MovieRepository";
import { IMovieResponseData } from "./models";

describe("Core.Services.Movie.MovieRepository", () => {
  const movie: MoviesModels.IMovie = {
    title: "Test",
    tagline: "",
    voteAverage: 1,
    voteCount: 2,
    releaseDate: "testDate",
    posterPath: "",
    overview: "",
    budget: 10000,
    revenue: 20,
    runtime: 120,
    genres: ["All"],
    id: 100,
    hasError: false
  };

  it("should create", () => {
    expect(MovieRepository).toBeTruthy();
  });

  it("getMovies should fetch movies", async () => {
    const query: string = "";
    const data: any = {
      response: { movies: [movie] }
    };
    const spy: any = jest.spyOn(ajax, "get");
    spy.mockReturnValue(observableOf(data));

    await MovieRepository.getMovies(query).subscribe((dp) => expect(dp).toEqual(data.response));
    expect(spy).toHaveBeenCalledWith(`${Endpoints.AppHost}/movies`);
  });

  it("getMovies should fetch movies with query", async () => {
    const query: string = "sortBy=vote_average";
    const data: any = {
      response: { movies: [movie] }
    };
    const spy: any = jest.spyOn(ajax, "get");
    spy.mockReturnValue(observableOf(data));

    await MovieRepository.getMovies(query).subscribe((dp) => expect(dp).toEqual(data.response));
    expect(spy).toHaveBeenCalledWith(`${Endpoints.AppHost}/${"movies?" + query}`);
  });

  it("getMovieById should fetch movie", async () => {
    const id: string = "200";
    const data: any = {
      response: { movie }
    };
    const spy: any = jest.spyOn(ajax, "get");
    spy.mockReturnValue(observableOf(data));

    await MovieRepository.getMovieById(id).subscribe((dp) => expect(dp).toEqual(data.response));
    expect(spy).toHaveBeenCalledWith(`${Endpoints.AppHost}/movies/${id}`);
  });

  it("createMovie should create movie", async () => {
    const request: Omit<IMovieResponseData, "id"> = { title: "Test" } as Omit<IMovieResponseData, "id">;
    const data: any = {
      response: { movie }
    };
    const spy: any = jest.spyOn(ajax, "post");
    spy.mockReturnValue(observableOf(data));

    await MovieRepository.createMovie(request).subscribe((dp) => expect(dp).toEqual(data.response));
    expect(spy).toHaveBeenCalledWith(`${Endpoints.AppHost}/movies`, request, header);
  });

  it("updateMovie should update movie", async () => {
    const request: IMovieResponseData = { title: "Test" } as IMovieResponseData;
    const data: any = {
      response: { movie }
    };
    const spy: any = jest.spyOn(ajax, "put");
    spy.mockReturnValue(observableOf(data));

    await MovieRepository.updateMovie(request).subscribe((dp) => expect(dp).toEqual(data.response));
    expect(spy).toHaveBeenCalledWith(`${Endpoints.AppHost}/movies`, request, header);
  });

  it("deleteMovie should delete movie", async () => {
    const request: IMovieResponseData = ({ id: "100" } as unknown) as IMovieResponseData;
    const spy: any = jest.spyOn(ajax, "delete");
    spy.mockReturnValue(observableOf({}));

    await MovieRepository.deleteMovie(request).subscribe((dp) => expect(dp).toEqual(request));
    expect(spy).toHaveBeenCalledWith(`${Endpoints.AppHost}/movies/${request.id}`);
  });
});
