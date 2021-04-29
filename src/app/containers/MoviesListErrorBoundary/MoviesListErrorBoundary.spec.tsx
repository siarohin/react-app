import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { MoviesListErrorBoundary } from "./MoviesListErrorBoundary";

describe("Containers.MoviesListErrorBoundary.MoviesListErrorBoundary: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<MoviesListErrorBoundary />);
    expect(component.exists()).toBe(true);
  });
});
