import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "../public/assets/styles.scss";
import { configureStore } from "./core";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
