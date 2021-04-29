import { getSearchValueFromPath } from "./get-search-value-from-path.util";

describe("Utils.getSearchValueFromPath: ", () => {
  it("should return normalized search value", () => {
    const expected: string = "Movie";
    expect(getSearchValueFromPath(" Search Movie ")).toBe(expected);
  });
});
