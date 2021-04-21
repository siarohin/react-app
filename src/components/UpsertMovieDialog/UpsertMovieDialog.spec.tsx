import React from "react";
import ReactDOM from "react-dom";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UpsertMovieDialog } from "./UpsertMovieDialog";
import { IDialogSettings } from "../../models";
import { MoviesModels } from "../../core";

const getElementByName = (attr: string) => document.querySelector(`[name="${attr}"]`);

describe("Components.UpsertMovieDialog.UpsertMovieDialog: ", () => {
  let inputField: HTMLElement;
  let submitButton: HTMLElement;
  let resetButton: HTMLElement;
  let closeButton: HTMLElement;

  const handleSubmit = jest.fn();
  const handleClose = jest.fn();

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
    render(<UpsertMovieDialog open onSubmit={handleSubmit} onClose={handleClose} dialogSettings={dialogSettings} />);
    inputField = screen.getByRole("textbox", { name: /title/i });
    resetButton = screen.getByRole("button", { name: /reset/i });
    submitButton = screen.getByRole("button", { name: /submit/i });
    closeButton = screen.getByRole("button", { name: "" });
  });

  it("should render component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <UpsertMovieDialog open onSubmit={handleSubmit} onClose={handleClose} dialogSettings={dialogSettings} />,
      div
    );
  });

  it("should render the form fields", () => {
    expect(screen.getByRole("heading", { name: dialogSettings.title })).toBeInTheDocument();
    expect(getElementByName("id")).toBeInTheDocument();
    expect(getElementByName("releaseDate")).toBeInTheDocument();
    expect(getElementByName("genres")).toBeInTheDocument();
    expect(getElementByName("title")).toHaveValue(dialogSettings.values.title);
    expect(getElementByName("posterPath")).toHaveValue(dialogSettings.values.posterPath);
    expect(getElementByName("overview")).toHaveValue(dialogSettings.values.overview);
    expect(getElementByName("runtime")).toHaveValue(dialogSettings.values.runtime);
  });

  it("should submit correct values", async () => {
    const title: string = "Test title";

    fireEvent.change(inputField, {
      target: { value: title }
    });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        ...dialogSettings.values,
        title
      })
    );
  });

  it("should call onClose on handleClose", async () => {
    fireEvent.click(closeButton);

    await waitFor(() => expect(handleClose).toHaveBeenCalled());
  });

  it("should reset form on handleReset", async () => {
    const title: string = "Test title 2";

    fireEvent.change(inputField, {
      target: { value: title }
    });

    await waitFor(() => expect(inputField).toHaveValue(title));

    fireEvent.click(resetButton);

    await waitFor(() => expect(inputField).toHaveValue(dialogSettings.values.title));
  });

  it("should validate form", async () => {
    expect(inputField.getAttribute("aria-invalid")).toBe("false");

    userEvent.clear(inputField);
    userEvent.tab();

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(inputField.getAttribute("aria-invalid")).toBe("true");
    });
  });
});
