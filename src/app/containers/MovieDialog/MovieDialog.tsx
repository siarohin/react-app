import React, { ComponentType, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { DialogTitle, SharedModels, MoviesModels, MoviesActions, State, UserPreferencesModels } from "../../core";
import { IMovieDialog } from "../../shared";
import { getPath } from "../../utils";
import { DeleteMovieDialog, UpsertMovieDialog } from "../../components";

const MovieDialog = (
  props: Omit<IMovieDialog, "onSubmit"> & SharedModels.IDispatchAction & { searchValue: string }
): ReactElement<typeof DeleteMovieDialog> | ReactElement<typeof UpsertMovieDialog> => {
  const { open, onClose, dialogSettings, genres, searchValue, dispatch } = props;
  const history = useHistory();
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
    const value: string = searchValue?.trim();

    dispatch(MoviesActions.deleteMovie({ movie }));
    history.push(getPath(value));

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

const mapStateToProps = (state: State): { genres: UserPreferencesModels.IGenres; searchValue: string } => {
  return {
    genres: state.userPreferences.genres,
    searchValue: state.userPreferences.search.selected
  };
};

export default connect(mapStateToProps)(MovieDialog as ComponentType<any>);
