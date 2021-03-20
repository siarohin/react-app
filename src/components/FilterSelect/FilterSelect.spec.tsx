import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";
import values from "lodash/values";

import { FilterOptions } from "../../core";
import { FilterSelect } from "./FilterSelect";

describe("Components.FilterSelect.FilterSelect: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(
      <FilterSelect sortingOptions={{ options: values(FilterOptions), selected: "" }} changeSorting={() => noop} />
    );
    expect(component.exists()).toBe(true);
  });
});
