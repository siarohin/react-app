import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";

import { NotFound } from "./NotFound";

describe("Pages.NotFound.NotFound: ", () => {
  let component: ReactTestRenderer;

  beforeEach(() => {
    component = renderer.create(
      <Router>
        <Switch>
          <Route path="/page-not-found" component={NotFound} />
        </Switch>
      </Router>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
