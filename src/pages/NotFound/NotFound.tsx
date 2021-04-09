import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import "./NotFound.scss";
import { APP_NAME, RouterPath } from "../../core";
import { Button } from "../../shared";
import { AppLogo, Footer } from "../../components";

export const NotFound = (): ReactElement => {
  return (
    <div className="app-not-found">
      <AppLogo content={APP_NAME} />
      <div className="app-not-found__content">
        <span>Page not found</span>
        <Button component={Link} to={RouterPath.Search} className="app-not-found__button">
          Go back to home
        </Button>
      </div>
      <Footer />
    </div>
  );
};
