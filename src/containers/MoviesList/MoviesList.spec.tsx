import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";
import noop from "lodash/noop";

import { State } from "../../core";
import MoviesList from "./MoviesList";

const mockStore = configureStore([]);

describe("Containers.MoviesList.MoviesList: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({
      movieList: {
        movies: []
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <MoviesList editableAction={() => noop} />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
