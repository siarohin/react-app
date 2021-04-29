import React, { ChangeEvent, ComponentType, ReactElement, useMemo } from "react";
import { connect } from "react-redux";

import "./PaginationLayout.scss";
import { Pagination } from "../../shared";
import { MoviesModels, MOVIES_PER_PAGE, State, SharedModels, UserPreferencesActions } from "../../core";

const PaginationLayout = (
  props: Partial<MoviesModels.IMoviesState> & SharedModels.IDispatchAction
): ReactElement<any> | null => {
  const { totalAmount, offset, limit, dispatch } = props;

  const count = useMemo((): number => Math.ceil(totalAmount! / limit!), [totalAmount, limit]);
  const page = useMemo((): number => offset! / limit! + 1, [offset, limit]);

  const handleOnChange = (event: ChangeEvent<unknown>) => {
    const newOffset: number = Number((event.target as HTMLElement).innerText) * MOVIES_PER_PAGE - MOVIES_PER_PAGE;
    const shouldUpdateOffset: boolean = newOffset !== offset;

    if (shouldUpdateOffset) {
      dispatch(UserPreferencesActions.updateOffset({ selected: newOffset.toString() }));
    }
  };

  const isPaginationVisible: boolean = count > 1;

  if (!isPaginationVisible) {
    return null;
  }

  return (
    <Pagination
      className="app-pagination"
      onChange={handleOnChange}
      page={page}
      count={count}
      hidePrevButton
      hideNextButton
    />
  );
};

const mapStateToProps = (state: State): Partial<MoviesModels.IMoviesState> => {
  return {
    totalAmount: state.movieList.totalAmount,
    limit: state.movieList.limit,
    offset: state.movieList.offset
  };
};

export default connect(mapStateToProps)(PaginationLayout as ComponentType<any>);
