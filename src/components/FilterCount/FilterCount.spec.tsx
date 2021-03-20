import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { FilterCount } from "./FilterCount";

describe("Components.FilterCount.FilterCount: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<FilterCount count={undefined} />);
    expect(component.exists()).toBe(true);
  });
});
