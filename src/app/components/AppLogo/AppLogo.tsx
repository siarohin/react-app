import React, { ReactElement } from "react";

import "./AppLogo.scss";

export const AppLogo = ({ content }: { content: string }): ReactElement => <h1 className="app-logo">{content}</h1>;
