import React, { ComponentType, ReactElement, useCallback, useMemo, useState } from "react";
import Notifications, { NotificationsState } from "react-notification-system-redux";
import isEmpty from "lodash/isEmpty";

import "./App.scss";
import { Footer } from "./components";
import {
  MainLayout,
  MoviesFilter,
  MoviesList,
  MoviesListErrorBoundary,
  Header,
  HeaderLayout,
  MovieDialog,
  MovieDetails
} from "./containers";
import { DialogTitle, DialogAction, MoviesModels, State } from "./core";
import { IDialogSettings, IMovieAction } from "./models";
import { getEnumKey } from "./utils";
import { AppState } from "./AppState";
import { connect } from "react-redux";

const App = ({
  notifications,
  movie
}: {
  notifications: NotificationsState;
  movie: MoviesModels.IMovie;
}): ReactElement => {
  const [movieDialog, setMovieDialog] = useState(AppState.movieDialog);

  const handleCloseDialog = useCallback((): void => setMovieDialog({ dialogSettings: undefined, open: false }), [
    movieDialog
  ]);

  const handleEditableAction = useCallback(
    (action: IMovieAction): void => {
      try {
        const actionType: string = getEnumKey(DialogAction, action?.action);
        const dialogSettings: IDialogSettings = { title: DialogTitle[actionType], values: action?.movie };
        setMovieDialog({ dialogSettings, open: true });
      } catch {
        return;
      }
    },
    [movieDialog]
  );

  const header = useMemo(
    () => (isEmpty(movie) ? <Header editableAction={handleEditableAction} /> : <MovieDetails movie={movie} />),
    [movie]
  );

  const getDialog = useMemo((): ReactElement<typeof MovieDialog> | null => {
    const hasNotDialog: boolean = !movieDialog.dialogSettings;
    return hasNotDialog ? null : (
      <MovieDialog dialogSettings={movieDialog.dialogSettings} open={movieDialog.open} onClose={handleCloseDialog} />
    );
  }, [movieDialog]);

  return (
    <>
      <HeaderLayout container={header} />
      <MainLayout>
        <MoviesFilter />
        <MoviesListErrorBoundary>
          <MoviesList editableAction={handleEditableAction} />
        </MoviesListErrorBoundary>
        {getDialog}
      </MainLayout>
      <Footer />
      <Notifications notifications={notifications} />
    </>
  );
};

const mapStateToProps = (state: State): { notifications: NotificationsState; movie: MoviesModels.IMovie } => {
  return {
    notifications: state.notifications,
    movie: state.userPreferences.selectedMovie
  };
};

export default connect(mapStateToProps)(App as ComponentType<any>);
