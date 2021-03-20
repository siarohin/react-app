import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { AppLogo } from "./AppLogo";

describe("Components.AppLogo.AppLogo: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<AppLogo content="" />);
    expect(component.exists()).toBe(true);
  });

  it("should display title", () => {
    const title: string = "Hello Words";
    component = shallow(<AppLogo content={title} />);
    expect(component.text()).toEqual(title);
  });
});
