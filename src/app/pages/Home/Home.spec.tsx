import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";
import Notifications from "react-notification-system-redux";

import { State } from "../../core";
import { HeaderLayout, MainLayout } from "../../containers";
import { Footer } from "../../components";
import { Route, BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("Pages.Home.Home: ", () => {
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
        },
        search: {
          selected: ""
        }
      },
      notifications: []
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <Route path="/">
            <HeaderLayout />
            <MainLayout />
            <Footer />
            <Notifications notifications={store.notifications} />
          </Route>
        </Router>
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
