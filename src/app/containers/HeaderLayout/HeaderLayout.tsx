import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

import "./HeaderLayout.scss";
import { APP_NAME, RouterPath } from "../../core";
import { AppLogo } from "../../components";

const MovieDetails = loadable(() => import("../MovieDetails"));
const Header = loadable(() => import("../Header"));

export const HeaderLayout = (): ReactElement => {
  return (
    <div className="app-header-layout">
      <div className="app-header-layout__logo">
        <AppLogo content={APP_NAME} />
      </div>
      <Switch>
        <Route path={`${RouterPath.Movie}/:id`} component={MovieDetails} />
        <Route path="*" component={Header} />
      </Switch>
    </div>
  );
};
