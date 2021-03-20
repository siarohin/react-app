import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { MovieDetails } from "./MovieDetails";

describe("Containers.MovieDetails.MovieDetails: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<MovieDetails movie={undefined} handleClose={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
