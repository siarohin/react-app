import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { loadableReady } from "@loadable/component";
import "babel-polyfill";

import "../public/assets/styles.scss";
import { configureStore, effects as effects$, isServer } from "./app/core";
import App from "./app/App";

const { store, runEffects } = configureStore((window as any).__INITIAL_STATE__);
runEffects([effects$]);

const renderMethod = isServer ? hydrate : render;

loadableReady(() => {
  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});
