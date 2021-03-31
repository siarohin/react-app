import React, { ReactElement } from "react";

import "./DeleteMovieDialog.scss";
import { Dialog, Button, IconButton, DialogActions, DialogContent, CloseIcon } from "../../shared";
import { IMovieDialog } from "../../models";

export const DeleteMovieDialog = (props: Omit<IMovieDialog, "onSubmit">): ReactElement<IMovieDialog> => {
  const { onClose, onDelete, open, dialogSettings } = props;

  const handleClose = (): void => onClose();

  const handleDelete = (): void => onDelete(dialogSettings.values);

  return (
    <Dialog fullWidth maxWidth="sm" disableScrollLock={true} open={open} onClose={handleClose}>
      <IconButton className="app-delete-movie-dialog__close-button" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <form className="app-delete-movie-dialog__form" noValidate autoComplete="off">
        <h2 className="app-delete-movie-dialog__title">{dialogSettings?.title}</h2>
        <DialogContent className="app-delete-movie-dialog__content">
          A you sure you want to delete &ldquo;{dialogSettings.values.title}&rdquo; movie?
        </DialogContent>
        <DialogActions className="app-delete-movie-dialog__action">
          <Button className="app-delete-movie-dialog__button" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
