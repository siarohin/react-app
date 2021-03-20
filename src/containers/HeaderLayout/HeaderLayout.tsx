import React, { ReactElement } from "react";

import "./HeaderLayout.scss";
import { APP_NAME } from "../../core";
import { AppLogo } from "../../components";
import { IHeaderContainer } from "../../models";

export const HeaderLayout = (props: IHeaderContainer): ReactElement => {
  const { container } = props;

  return (
    <div className="app-header-layout">
      <div className="app-header-layout__logo">
        <AppLogo content={APP_NAME} />
      </div>
      <>{container}</>
    </div>
  );
};
