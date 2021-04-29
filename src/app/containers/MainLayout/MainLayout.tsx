import { Box } from "@material-ui/core";
import React, { ComponentType, ReactElement, useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import loadable from "@loadable/component";

import "./MainLayout.scss";
import { DialogAction, DialogTitle, MoviesModels, RouterPath, State, UserPreferencesModels } from "../../core";
import { getEnumKey } from "../../utils";
import { IDialogSettings } from "../../shared";
import { MoviesFilter } from "../MoviesFilter";

const MoviesList = loadable(() => import("../MoviesList"));
const NoMovies = loadable(() => import("../../components/NoMovies"));
const MovieDialog = loadable(() => import("../MovieDialog"), { ssr: false });

const MainLayout = ({ dialogAction }: { dialogAction: UserPreferencesModels.IMovieAction }): ReactElement => {
  const [movieDialog, setMovieDialog] = useState({
    dialogSettings: {
      title: "",
      values: {} as MoviesModels.IMovie
    },
    open: false
  });
  const { dialogSettings, open } = movieDialog;

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

  return (
    <Box className="app-main-layout">
      <MoviesFilter />
      <Switch>
        <Route
          path={[`${RouterPath.Movie}/:id`, `${RouterPath.Search}/:search`, RouterPath.Search]}
          component={MoviesList}
        />
        <Route exact path="/" component={NoMovies} />
      </Switch>
      <MovieDialog dialogSettings={dialogSettings} open={open} onClose={handleCloseDialog} />
    </Box>
  );
};

const mapStateToProps = (state: State): { dialogAction: UserPreferencesModels.IMovieAction } => ({
  dialogAction: state.userPreferences.dialogAction
});

export default connect(mapStateToProps)(MainLayout as ComponentType<any>);
