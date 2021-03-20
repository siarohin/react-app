import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { MovieCard } from "./MovieCard";

describe("Components.MovieCard.MovieCard: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<MovieCard movie={undefined} editableAction={() => noop} onClick={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
