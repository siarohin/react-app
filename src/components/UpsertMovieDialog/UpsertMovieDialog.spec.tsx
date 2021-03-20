import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { UpsertMovieDialog } from "./UpsertMovieDialog";

describe("Components.UpsertMovieDialog.UpsertMovieDialog: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(
      <UpsertMovieDialog open onClose={() => noop} dialogSettings={undefined} onSubmit={() => noop} />
    );
    expect(component.exists()).toBe(true);
  });
});
