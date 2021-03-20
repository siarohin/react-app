import React, { ReactElement } from "react";

import "./Footer.scss";
import { APP_NAME } from "../../core";

export const Footer = (): ReactElement => <div className="app-footer">{APP_NAME}</div>;
