import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { SearchPanel } from "./SearchPanel";

describe("Components.SearchPanel.SearchPanel: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<SearchPanel />);
    expect(component.exists()).toBe(true);
  });
});
