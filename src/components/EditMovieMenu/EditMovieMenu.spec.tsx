import React, { ReactElement } from "react";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { shallow, ShallowWrapper } from "enzyme";

import { EditMovieMenu } from "./EditMovieMenu";

describe("Components.EditMovieMenu.EditMovieMenu: ", () => {
  let openButton: HTMLElement;
  let component: ShallowWrapper<ReactElement>;

  const handleMenuAction = jest.fn();
  const handleMenuOpen = jest.fn();

  beforeEach(() => {
    render(<EditMovieMenu className="test" handleMenuAction={handleMenuAction} handleMenuOpen={handleMenuOpen} />);
    openButton = screen.getByRole("button", { name: "" });
  });

  it("should render component", () => {
    component = shallow(
      <EditMovieMenu className="test" handleMenuAction={handleMenuAction} handleMenuOpen={handleMenuOpen} />
    );
    expect(component.exists()).toBe(true);
  });

  it("should call handleOpen on handleOpen", async () => {
    fireEvent.click(openButton);

    await waitFor(() => expect(handleMenuOpen).toHaveBeenCalled());
  });
});
