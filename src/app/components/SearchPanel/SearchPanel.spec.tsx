import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { SearchPanel } from "./SearchPanel";

describe("Components.SearchPanel.SearchPanel: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<SearchPanel selected="" onSubmit={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
