import React, { ComponentType, ReactElement } from "react";
import { connect } from "react-redux";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./NotFound.scss";
import { APP_NAME, Endpoints, MetaTitle, MoviesActions, RouterPath, SharedModels } from "../../core";
import { Button } from "../../shared";
import { AppLogo, Footer } from "../../components";
import { useComponentDidMount } from "../../hooks";

type Props = {
  code: number;
  children: React.ReactNode;
};

// Component is used for passing http status for SSR
const Status = ({ code, children }: Props) => {
  const render = ({ staticContext = {} }: RouteComponentProps) => {
    staticContext.statusCode = code;
    return children;
  };
  return <Route render={render} />;
};

const NotFound = (props: SharedModels.IDispatchAction): ReactElement => {
  const { dispatch } = props;

  useComponentDidMount(() => {
    // Run SSR observer
    dispatch(MoviesActions.loadMoviesComplete());
  });

  return (
    <>
      <Helmet>
        <title>{`${MetaTitle.NotFound}`}</title>
        <link rel="canonical" href={`${Endpoints.ClientHost}${RouterPath.NotFound}`} />
      </Helmet>

      <Status code={404}>
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
      </Status>
    </>
  );
};

export default connect()(NotFound as ComponentType<any>);
