import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";

import { State } from "../../core";
import MoviesFilter from "./MoviesFilter";

const mockStore = configureStore([]);

describe("Containers.MoviesFilter.MoviesFilter: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({
      movieList: {
        totalAmount: 3000
      },
      userPreferences: {
        genres: {
          all: ["Romantic"],
          selected: ""
        },
        sortingOptions: {
          options: ["Rating", "Release date"],
          selected: "Release date"
        }
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <MoviesFilter />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
