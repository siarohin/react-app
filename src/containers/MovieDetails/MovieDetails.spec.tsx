import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";

import { State } from "../../core";
import MovieDetails from "./MovieDetails";

const mockStore = configureStore([]);

describe("Containers.MovieDetails.MovieDetails: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({} as State);

    component = renderer.create(
      <Provider store={store}>
        <MovieDetails movie={undefined} />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
