import React, { ComponentType, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Notifications, { NotificationsState } from "react-notification-system-redux";

import "./App.scss";
import { Footer, NoMovies } from "../../components";
import {
  MainLayout,
  MoviesFilter,
  MoviesList,
  MoviesListErrorBoundary,
  Header,
  HeaderLayout,
  MovieDialog,
  MovieDetails
} from "../../containers";
import { DialogTitle, DialogAction, State, MoviesModels, UserPreferencesModels, RouterPath } from "../../core";
import { IDialogSettings } from "../../models";
import { getEnumKey } from "../../utils";
import { AppState } from "./models";

const App = ({
  notifications,
  dialogAction
}: {
  notifications: NotificationsState;
  dialogAction: UserPreferencesModels.IMovieAction;
}): ReactElement => {
  const [movieDialog, setMovieDialog] = useState(AppState.movieDialog);

  const handleCloseDialog = useCallback(
    (): void => setMovieDialog({ dialogSettings: (undefined as unknown) as IDialogSettings, open: false }),
    [movieDialog]
  );

  useEffect(() => {
    try {
      const actionType: string = getEnumKey(DialogAction, dialogAction?.action);
      const dialogSettings: IDialogSettings = {
        title: DialogTitle[actionType as keyof typeof DialogTitle],
        values: dialogAction?.movie as MoviesModels.IMovie
      };
      setMovieDialog({ dialogSettings, open: true });
    } catch {
      return;
    }
  }, [dialogAction]);

  const getDialog = useMemo((): ReactElement<typeof MovieDialog> | null => {
    const hasNotDialog: boolean = !movieDialog.dialogSettings;
    return hasNotDialog ? null : (
      <MovieDialog dialogSettings={movieDialog.dialogSettings} open={movieDialog.open} onClose={handleCloseDialog} />
    );
  }, [movieDialog]);

  return (
    <>
      <HeaderLayout>
        <Switch>
          <Route exact path={`${RouterPath.Movie}/:id`} component={MovieDetails} />
          <Route path="*" component={Header} />
        </Switch>
      </HeaderLayout>
      <MainLayout>
        <MoviesFilter />
        <Switch>
          <Route exact path={[`${RouterPath.Movie}/:id`, `${RouterPath.Search}/:search`, RouterPath.Search]}>
            <MoviesListErrorBoundary>
              <MoviesList />
            </MoviesListErrorBoundary>
          </Route>
          <Route exact path="/" component={NoMovies} />
          <Redirect from="*" to={RouterPath.NotFound} />
        </Switch>
        {getDialog}
      </MainLayout>
      <Footer />
      <Notifications notifications={notifications} />
    </>
  );
};

const mapStateToProps = (
  state: State
): { notifications: NotificationsState; dialogAction: UserPreferencesModels.IMovieAction } => ({
  notifications: state.notifications,
  dialogAction: state.userPreferences.dialogAction
});

export default connect(mapStateToProps)(App as ComponentType<any>);
