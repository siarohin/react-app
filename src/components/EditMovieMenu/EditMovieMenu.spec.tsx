import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { EditMovieMenu } from "./EditMovieMenu";

describe("Components.EditMovieMenu.EditMovieMenu: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<EditMovieMenu className="test" handleMenuAction={() => noop} handleMenuOpen={() => noop} />);
    expect(component.exists()).toBe(true);
  });
});
