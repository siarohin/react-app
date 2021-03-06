import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";
import noop from "lodash/noop";

import { MoviesModels, State } from "../../core";
import MovieDialog from "./MovieDialog";

const mockStore = configureStore([]);

describe("Containers.MovieDialog.MovieDialog: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  const { movieDialog } = {
    movieDialog: {
      dialogSettings: {
        title: "",
        values: {} as MoviesModels.IMovie
      },
      open: false
    }
  };

  beforeEach(() => {
    store = mockStore({
      userPreferences: {
        genres: {
          all: ["Romantic"],
          selected: "All"
        },
        search: {
          selected: ""
        }
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <MovieDialog dialogSettings={movieDialog.dialogSettings} open={movieDialog.open} onClose={() => noop} />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
