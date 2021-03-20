import { transformSnakeToCamelCase } from "./transform-snake-to-camel-case.util";

describe("Utils.transformSnakeToCamelCase: ", () => {
  it("should return transformed word", () => {
    const expected: string = "apiTestingString";
    expect(transformSnakeToCamelCase("api_testing_string")).toBe(expected);
  });

  it("should return origin word", () => {
    const expected: string = "api";
    expect(transformSnakeToCamelCase("api")).toBe(expected);
  });
});
