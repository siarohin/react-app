import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";

import { State } from "../../core";
import MovieDetails from "./MovieDetails";

const mockStore = configureStore([]);

describe("Containers.MovieDetails.MovieDetails: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({ id: "1" })
  }));

  beforeEach(() => {
    store = mockStore({
      userPreferences: {
        selectedMovie: {},
        search: {
          selected: ""
        }
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <Route path="/film/1" component={MovieDetails} />
        </Router>
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
