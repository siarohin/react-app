import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";

import { IDialogSettings } from "../../models";
import { DeleteMovieDialog } from "./DeleteMovieDialog";

describe("Components.DeleteMovieDialog.DeleteMovieDialog: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    const dialogSettings = {
      title: "",
      values: {
        title: ""
      }
    } as IDialogSettings;

    component = shallow(
      <DeleteMovieDialog open onClose={() => noop} dialogSettings={dialogSettings} onDelete={() => noop} />
    );
    expect(component.exists()).toBe(true);
  });
});
