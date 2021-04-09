import { RouterPath } from "../core";
import { getPath } from "./get-path.util";

describe("Utils.getPath: ", () => {
  it("should return `/search` string", () => {
    const expected: string = RouterPath.Search;
    expect(getPath("")).toBe(expected);
  });

  it("should return `/search/Search {value}` string", () => {
    const value: string = "Test";
    const expected: string = `${RouterPath.Search}/Search ${value}`;
    expect(getPath(value)).toBe(expected);
  });
});
