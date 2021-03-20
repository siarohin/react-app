import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { DeleteMovieDialog } from "./DeleteMovieDialog";

describe("Components.DeleteMovieDialog.DeleteMovieDialog: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(
      <DeleteMovieDialog open onClose={() => noop} dialogSettings={undefined} onDelete={() => noop} />
    );
    expect(component.exists()).toBe(true);
  });
});
