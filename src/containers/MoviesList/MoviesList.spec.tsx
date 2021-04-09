import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";

import { State } from "../../core";
import MoviesList from "./MoviesList";

const mockStore = configureStore([]);

describe("Containers.MoviesList.MoviesList: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({ search: "Search" })
  }));

  beforeEach(() => {
    store = mockStore({
      movieList: {
        movies: [{}]
      },
      userPreferences: {
        search: {
          selected: ""
        }
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <Route path="/search" component={MoviesList} />
        </Router>
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
