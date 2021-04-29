import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Footer } from "./Footer";

describe("Components.Footer.Footer: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<Footer />);
    expect(component.exists()).toBe(true);
  });
});
