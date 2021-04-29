import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";

import Header from "./Header";
import { State } from "../../core";

const mockStore = configureStore([]);

describe("Containers.Header.Header: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({
      userPreferences: {
        search: {
          selected: ""
        }
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
