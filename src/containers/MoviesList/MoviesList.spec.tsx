import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { MoviesList } from "./MoviesList";

describe("Containers.MoviesList.MoviesList: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<MoviesList isLoading movies={[]} editableAction={() => noop} handleMovieClick={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
