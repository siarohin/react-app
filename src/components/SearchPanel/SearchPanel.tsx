import React, { ReactElement } from "react";
import { Button, TextField } from "@material-ui/core";

import "./SearchPanel.scss";

export const SearchPanel = (): ReactElement => {
  return (
    <div className="app-search-panel">
      <h3 className="app-search-panel__name">Find your movie</h3>
      <form className="app-search-panel__form" noValidate>
        <TextField className="app-search-panel__form-field" placeholder="What do you want to watch?" variant="filled" />
        <Button className="app-search-panel__form-button">Search</Button>
      </form>
    </div>
  );
};
