import React, { ReactElement } from "react";

import { Button, AddIcon } from "../../shared";

import "./AddMovieButton.scss";
import { IAddMovieButtonProps } from "./models";

export const AddMovieButton = (props: IAddMovieButtonProps): ReactElement<IAddMovieButtonProps> => {
  return (
    <Button className="app-add-movie-button" onClick={props.handleClick}>
      <AddIcon /> Add movie
    </Button>
  );
};
