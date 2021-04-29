import React, { ComponentType, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./Header.scss";
import { DialogAction, SharedModels, State, UserPreferencesActions, UserPreferencesModels } from "../../core";
import { IMovieUpsertAction } from "../../shared";
import { getPath } from "../../utils";
import { AddMovieButton, SearchPanel } from "../../components";

const Header = (
  props: UserPreferencesModels.ISearch & IMovieUpsertAction & SharedModels.IDispatchAction
): ReactElement => {
  const { selected, dispatch } = props;
  const history = useHistory();

  const handleClick = (): void => {
    const dialogAction: UserPreferencesModels.IMovieAction = {
      action: DialogAction.CREATE
    };
    dispatch(UserPreferencesActions.updateDialogAction({ dialogAction }));
  };

  const handleSubmit = (searchValue: string): void => {
    const value: string = searchValue?.trim();

    dispatch(UserPreferencesActions.updateSearchValue({ selected: value }));
    history.push(getPath(value));
  };

  return (
    <>
      <div className="app-header__top-right">
        <AddMovieButton handleClick={handleClick} />
      </div>
      <div className="app-header__container">
        <SearchPanel selected={selected} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

const mapStateToProps = (state: State): UserPreferencesModels.ISearch => ({
  selected: state.userPreferences.search.selected
});

export default connect(mapStateToProps)(Header as ComponentType<any>);
