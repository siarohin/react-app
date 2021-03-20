import React from "react";
import { Provider } from "react-redux";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import configureStore from "redux-mock-store";
import noop from "lodash/noop";

import { State } from "../../core";
import { AppState } from "../../AppState";
import MovieDialog from "./MovieDialog";

const mockStore = configureStore([]);

describe("Containers.MovieDialog.MovieDialog: ", () => {
  let store: any;
  let component: ReactTestRenderer;

  const { genres, movieDialog } = AppState;

  beforeEach(() => {
    store = mockStore({
      movieList: {
        movies: [],
        isLoading: false
      }
    } as State);

    component = renderer.create(
      <Provider store={store}>
        <MovieDialog
          genres={genres.all}
          dialogSettings={movieDialog.dialogSettings}
          open={movieDialog.open}
          onClose={() => noop}
        />
      </Provider>
    );
  });

  it("should render component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
