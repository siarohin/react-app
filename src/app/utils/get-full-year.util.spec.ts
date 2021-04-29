import { getFullYear } from "./get-full-year.util";

describe("Utils.getFullYear: ", () => {
  it("should return full year of `2016-12-29`", () => {
    const expected: string = "2016";
    expect(getFullYear("2016-12-29")).toBe(expected);
  });

  it("should return an empty string of `2016-12-29-12345`", () => {
    const expected: string = "";
    expect(getFullYear("2016-12-29-12345")).toBe(expected);
  });
});
