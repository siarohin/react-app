import { hot } from "react-hot-loader";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import loadable from "@loadable/component";

import "../../public/assets/styles.scss";
import { Endpoints, MetaTitle, META_CHARSET, RouterPath } from "./core";
import { CircularProgress } from "./shared";
import { MoviesListErrorBoundary } from "./containers";

const fallback = <CircularProgress className="app__progress-bar" size="8rem" color="secondary" />;
const Home = loadable(() => import("./pages/Home"), { fallback });
const NotFound = loadable(() => import("./pages/NotFound"));

const App = () => {
  const currentYear: string = new Date().getFullYear().toString();

  return (
    <>
      <Helmet defaultTitle={`${MetaTitle.DefaultTitle} in ${currentYear}`} titleTemplate="%s - React movie">
        <meta charSet={META_CHARSET} />
        <link rel="canonical" href={`${Endpoints.ClientHost}`} />
      </Helmet>

      <div className="app">
        <MoviesListErrorBoundary>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={`${RouterPath.Movie}/:id`} component={Home} />
            <Route path={RouterPath.Search} component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </MoviesListErrorBoundary>
      </div>
    </>
  );
};

export default hot(module)(App);
