import React, { ReactElement } from "react";

import "./Header.scss";
import { DialogAction } from "../../core";
import { AddMovieButton, SearchPanel } from "../../components";
import { IMovieUpsertAction } from "../../models";

export const Header = (props: IMovieUpsertAction): ReactElement => {
  const { editableAction } = props;

  const handleClick = (): void => editableAction({ action: DialogAction.CREATE });

  return (
    <>
      <div className="app-header__top-right">
        <AddMovieButton handleClick={handleClick} />
      </div>
      <div className="app-header__container">
        <SearchPanel />
      </div>
    </>
  );
};
