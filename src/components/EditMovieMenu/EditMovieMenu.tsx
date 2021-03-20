import React, { ReactElement, SyntheticEvent, useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./EditMovieMenu.scss";
import { IEditMovieMenuProps } from "./models";
import { DialogAction } from "../../core";
import { EditMovieMenuList } from "../EditMovieMenuList";

export const EditMovieMenu = (props: IEditMovieMenuProps): ReactElement<IEditMovieMenuProps> => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.handleMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    props.handleMenuOpen(false);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    props.handleMenuAction(DialogAction.UPDATE);
  };

  const handleDelete = () => {
    handleClose();
    props.handleMenuAction(DialogAction.DELETE);
  };

  return (
    <div className={props.className}>
      <IconButton className="app-edit-movie-menu__button" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <EditMovieMenuList
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};
