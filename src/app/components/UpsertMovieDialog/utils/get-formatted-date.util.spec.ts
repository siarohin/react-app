import { getFormattedDate } from "./get-formatted-date.util";

describe("Components.UpsertMovieDialog.Utils.getFormattedDate: ", () => {
  it("should return formatted Date `dd-mmm-yyyy`", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => new Date("2021-03-07T11:01:58.135Z").valueOf());

    expect(getFormattedDate(new Date(Date.now()))).toEqual("2021-03-07");
  });
});
