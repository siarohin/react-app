import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { MoviesFilter } from "./MoviesFilter";

describe("Containers.MoviesFilter.MoviesFilter: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(
      <MoviesFilter
        genres={undefined}
        count={undefined}
        isLoading
        sortingOptions={undefined}
        selected={() => noop}
        changeSorting={() => noop}
      />
    );
    expect(component.exists()).toBe(true);
  });
});
