import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { AddMovieButton } from "./AddMovieButton";

describe("Components.AddMovieButton.AddMovieButton: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<AddMovieButton handleClick={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
