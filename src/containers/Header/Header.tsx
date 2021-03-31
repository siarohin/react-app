import React, { ComponentType, ReactElement } from "react";
import { connect } from "react-redux";

import "./Header.scss";
import { DialogAction, SharedModels, State, UserPreferencesActions, UserPreferencesModels } from "../../core";
import { AddMovieButton, SearchPanel } from "../../components";
import { IMovieUpsertAction } from "../../models";

const Header = (
  props: UserPreferencesModels.ISearch & IMovieUpsertAction & SharedModels.IDispatchAction
): ReactElement => {
  const { selected, editableAction, dispatch } = props;

  const handleClick = (): void => editableAction({ action: DialogAction.CREATE });

  const handleSubmit = (value: string): void => {
    dispatch(UserPreferencesActions.updateSearchValue({ selected: value }));
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
