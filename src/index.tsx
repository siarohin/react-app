import React, { ReactElement } from "react";
import * as ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import "../public/assets/styles.scss";
import { configureStore, RouterPath } from "./core";
import { App, NotFound } from "./pages";

const store = configureStore();
const history = createBrowserHistory();

const Root = (): ReactElement => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path={RouterPath.NotFound} component={NotFound} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
