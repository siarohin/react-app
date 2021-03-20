import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { FilterButtons } from "./FilterButtons";
describe("Components.FilterButtons.FilterButtons: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(
      <FilterButtons
        genres={undefined}
        count={undefined}
        sortingOptions={undefined}
        selected={() => noop}
        changeSorting={() => noop}
      />
    );
    expect(component.exists()).toBe(true);
  });
});
