import { requireValidator } from "./validator";

describe("Components.UpsertMovieDialog.validator: ", () => {
  it("should set require for empty keys", () => {
    const value: { [key: string]: any } = {
      title: "Test",
      releaseDate: "",
      posterPath: ""
    };

    const expected: { [key: string]: any } = {
      releaseDate: true,
      posterPath: true
    };

    expect(requireValidator(value)).toEqual(expected);
  });

  it("should skip require for `id` key", () => {
    const value: { [key: string]: any } = {
      id: "",
      releaseDate: "",
      posterPath: ""
    };

    const expected: { [key: string]: any } = {
      releaseDate: true,
      posterPath: true
    };

    expect(requireValidator(value)).toEqual(expected);
  });
});
