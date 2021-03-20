import { Box } from "@material-ui/core";
import React, { ReactElement } from "react";

import "./MainLayout.scss";

export const MainLayout = (props: any): ReactElement => {
  return <Box className="app-main-layout">{props.children}</Box>;
};
