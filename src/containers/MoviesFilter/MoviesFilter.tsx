import React, { ReactElement } from "react";

import "./MoviesFilter.scss";
import { FilterButtons, FilterCount, FilterSelect } from "../../components";
import { IGenresFilter } from "../../models";

export const MoviesFilter = (props: IGenresFilter): ReactElement => {
  return (
    <div className="app-movies-filter">
      <div className="app-movies-filter__tab-panel">
        <FilterButtons {...props} />
      </div>
      <div className="app-movies-filter__select-panel">
        <FilterSelect changeSorting={props.changeSorting} sortingOptions={props.sortingOptions} />
      </div>
      <div className="app-movies-filter__count">{props.isLoading ? null : <FilterCount count={props.count} />}</div>
      <div className="app-movies-filter__separator"></div>
    </div>
  );
};
