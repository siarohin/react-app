import React, { ReactElement, SyntheticEvent } from "react";

import "./EditMovieMenuList.scss";
import { IconButton, MenuItem, MenuList, Popover, CloseIcon } from "../../shared";
import { IEditMovieMenuListProps } from "./models";

export const EditMovieMenuList = (props: IEditMovieMenuListProps): ReactElement<IEditMovieMenuListProps> => {
  const { anchorEl, handleClose, handleDelete, handleEdit } = props;

  const onClose = (event: SyntheticEvent) => {
    event.stopPropagation();
    handleClose();
  };

  const onEdit = (event: SyntheticEvent) => {
    event.stopPropagation();
    handleEdit();
  };

  const onDelete = (event: SyntheticEvent) => {
    event.stopPropagation();
    handleDelete();
  };

  return (
    <Popover
      className="app-edit-movie-menu-list"
      disableScrollLock={true}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <IconButton className="app-edit-movie-menu-list__close-button" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <MenuList className="app-edit-movie-menu-list__menu">
        <MenuItem className="app-edit-movie-menu-list__item" onClick={onEdit}>
          Edit
        </MenuItem>
        <MenuItem className="app-edit-movie-menu-list__item" onClick={onDelete}>
          Delete
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
