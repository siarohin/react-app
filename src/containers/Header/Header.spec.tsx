import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { Header } from "./Header";

describe("Containers.Header.Header: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<Header editableAction={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
