import React, { ComponentType, ReactElement } from "react";
import { connect } from "react-redux";

import { DialogTitle, SharedModels, MoviesModels, MoviesActions, State, UserPreferencesModels } from "../../core";
import { DeleteMovieDialog, UpsertMovieDialog } from "../../components";
import { IMovieDialog } from "../../models";

const MovieDialog = (
  props: Omit<IMovieDialog, "onSubmit"> & SharedModels.IDispatchAction
): ReactElement<typeof DeleteMovieDialog> | ReactElement<typeof UpsertMovieDialog> => {
  const { open, onClose, dialogSettings, genres, dispatch } = props;
  const isActionDelete: boolean = dialogSettings?.title === DialogTitle.DELETE;

  const handleSubmit = (movie: MoviesModels.IMovie): void => {
    const isActionCreate: boolean = isNaN(Number(movie.id));

    if (isActionCreate) {
      dispatch(MoviesActions.createMovie({ movie }));
    } else {
      dispatch(MoviesActions.updateMovie({ movie }));
    }

    onClose();
  };

  const handleDelete = (movie: MoviesModels.IMovie): void => {
    dispatch(MoviesActions.deleteMovie({ movie }));
    onClose();
  };

  if (isActionDelete) {
    return <DeleteMovieDialog open={open} onClose={onClose} onDelete={handleDelete} dialogSettings={dialogSettings} />;
  } else {
    return (
      <UpsertMovieDialog
        genres={genres}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
        dialogSettings={dialogSettings}
      />
    );
  }
};

const mapStateToProps = (state: State): Partial<UserPreferencesModels.IUserPreferencesState> => {
  return { genres: state.userPreferences.genres };
};

export default connect(mapStateToProps)(MovieDialog as ComponentType<any>);
