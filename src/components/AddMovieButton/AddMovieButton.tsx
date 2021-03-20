import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import "./AddMovieButton.scss";
import { IAddMovieButtonProps } from "./models";

export const AddMovieButton = (props: IAddMovieButtonProps): ReactElement<IAddMovieButtonProps> => {
  return (
    <Button className="app-add-movie-button" onClick={props.handleClick}>
      <AddIcon /> Add movie
    </Button>
  );
};
