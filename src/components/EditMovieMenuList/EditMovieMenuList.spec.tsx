import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { EditMovieMenuList } from "./EditMovieMenuList";

describe("Components.EditMovieMenuList.EditMovieMenuList: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(
      <EditMovieMenuList anchorEl={null} handleClose={() => noop} handleDelete={() => noop} handleEdit={() => noop} />
    );
    expect(component.exists()).toBe(true);
  });
});
