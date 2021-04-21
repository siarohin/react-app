import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import { AppLogo } from "./AppLogo";

describe("Components.AppLogo.AppLogo: ", () => {
  const title: string = "Hello Words";

  it("should render component", () => {
    const component = renderer.create(<AppLogo content={title} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should display title", () => {
    render(<AppLogo content={title} />);
    expect(screen.getByRole("heading")).toHaveTextContent(title);
  });
});
