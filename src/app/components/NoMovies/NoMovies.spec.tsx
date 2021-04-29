import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import NoMovies from "./NoMovies";

describe("Components.NoMovies.NoMovies: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<NoMovies />);
    expect(component.exists()).toBe(true);
  });
});
