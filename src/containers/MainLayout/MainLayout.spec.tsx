import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { MainLayout } from "./MainLayout";

describe("Containers.MainLayout.MainLayout: ", () => {
  let component: ShallowWrapper<ReactElement>;
  const children: Array<any> = [];

  it("should render component", () => {
    component = shallow(<MainLayout>{children}</MainLayout>);
    expect(component.exists()).toBe(true);
  });
});
