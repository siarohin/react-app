import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import map from "lodash/map";

import "./FilterSelect.scss";
import { Select, MenuItem, FormControl } from "../../shared";
import { FilterOptions } from "../../core";
import { IFilterSelectProps } from "./models";

export const FilterSelect = (props: IFilterSelectProps): ReactElement<IFilterSelectProps> => {
  const { sortingOptions, changeSorting } = props;
  const [selectedOption, setSelectedOption] = useState(FilterOptions.rating);

  const handleChange = (event: ChangeEvent<{ value: FilterOptions }>) => setSelectedOption(event.target.value);

  useEffect(() => changeSorting(selectedOption as string), [selectedOption]);

  return (
    <>
      <div className="app-filter-select__prefix">Sort by</div>
      <FormControl className="app-filter-select__control">
        <Select
          MenuProps={{ disableScrollLock: true }}
          value={selectedOption}
          onChange={handleChange}
          displayEmpty
          className="app-filter-select__select"
        >
          {map(sortingOptions?.options, (option, index) => (
            <MenuItem className="app-filter-select__item" key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
