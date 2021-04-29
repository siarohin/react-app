import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";

import { State } from "../../core";
import PaginationLayout from "./PaginationLayout";

const mockStore = configureStore([]);

describe("Containers.PaginationLayout.PaginationLayout: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({
      movieList: {
        totalAmount: 3000,
        limit: 30,
        offset: 0
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <PaginationLayout />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
