import React, { ReactElement } from "react";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { shallow, ShallowWrapper } from "enzyme";

import { IDialogSettings } from "../../models";
import { DeleteMovieDialog } from "./DeleteMovieDialog";
import { MoviesModels } from "../../core";

describe("Components.DeleteMovieDialog.DeleteMovieDialog: ", () => {
  let component: ShallowWrapper<ReactElement>;
  let closeButton: HTMLElement;
  let deleteButton: HTMLElement;

  const onClose = jest.fn();
  const onDelete = jest.fn();

  const dialogSettings: IDialogSettings = {
    title: "Edit dialog",
    values: {
      id: 100,
      title: "Best movie",
      releaseDate: "Mon Jun 20 2016 15:08:10 GMT+0300",
      posterPath: "https://path",
      genres: ["Romantic", "Comedy"],
      overview: "Overview",
      runtime: 120
    } as MoviesModels.IMovie
  };

  beforeEach(() => {
    render(<DeleteMovieDialog open onClose={onClose} onDelete={onDelete} dialogSettings={dialogSettings} />);
    closeButton = screen.getByRole("button", { name: "" });
    deleteButton = screen.getByRole("button", { name: /confirm/i });
  });

  it("should render component", () => {
    const dialogSettings = {
      title: "",
      values: {
        title: ""
      }
    } as IDialogSettings;

    component = shallow(
      <DeleteMovieDialog open onClose={onClose} onDelete={onDelete} dialogSettings={dialogSettings} />
    );
    expect(component.exists()).toBe(true);
  });

  it("should call onClose on handleClose", async () => {
    fireEvent.click(closeButton);

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("should call onDelete on handleDelete", async () => {
    fireEvent.click(deleteButton);

    await waitFor(() => expect(onDelete).toHaveBeenCalledWith(dialogSettings.values));
  });
});
