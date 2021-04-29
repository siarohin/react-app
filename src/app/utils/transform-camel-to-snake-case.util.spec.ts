import { transformCamelToSnakeCase } from "./transform-camel-to-snake-case.util";

describe("Utils.transformCamelToSnakeCase: ", () => {
  it("should return transformed word", () => {
    const expected: string = "api_testing_string";
    expect(transformCamelToSnakeCase("apiTestingString")).toBe(expected);
  });

  it("should return origin word", () => {
    const expected: string = "api";
    expect(transformCamelToSnakeCase("api")).toBe(expected);
  });
});
