import React, { ReactElement } from "react";

import "./FilterCount.scss";

export const FilterCount = ({ count }: { count: string | number }): ReactElement => {
  return (
    <>
      <span className="app-filter-count">{count}</span> movies found
    </>
  );
};
