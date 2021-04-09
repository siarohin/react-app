import React, { ReactElement } from "react";

import "./HeaderLayout.scss";
import { APP_NAME } from "../../core";
import { AppLogo } from "../../components";

export const HeaderLayout = ({ children }: any): ReactElement => {
  return (
    <div className="app-header-layout">
      <div className="app-header-layout__logo">
        <AppLogo content={APP_NAME} />
      </div>
      {{ ...children }}
    </div>
  );
};
