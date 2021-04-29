import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { HeaderLayout } from "./HeaderLayout";

describe("Containers.HeaderLayout.HeaderLayout: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<HeaderLayout container={undefined} />);
    expect(component.exists()).toBe(true);
  });
});
