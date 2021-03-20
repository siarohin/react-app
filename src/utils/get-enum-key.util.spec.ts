import { getEnumKey } from "./get-enum-key.util";
import { DialogAction } from "../core";

describe("Utils.getEnumKey: ", () => {
  it("should return action `CREATE`", () => {
    const expected: string = "CREATE";
    expect(getEnumKey(DialogAction, DialogAction.CREATE)).toBe(expected);
  });

  it("should return action `UPDATE`", () => {
    const expected: string = "UPDATE";
    expect(getEnumKey(DialogAction, DialogAction.UPDATE)).toBe(expected);
  });

  it("should return action `DELETE`", () => {
    const expected: string = "DELETE";
    expect(getEnumKey(DialogAction, DialogAction.DELETE)).toBe(expected);
  });

  it("should return error", () => {
    try {
      getEnumKey(DialogAction, "");
    } catch (error) {
      expect(error).toEqual(new Error());
    }
  });
});
