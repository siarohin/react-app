import React, { ReactElement, MouseEvent, useState, useEffect } from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import map from "lodash/map";

import "./FilterButtons.scss";
import { IGenresFilter } from "../../models";
import { DEFAULT_GENRE } from "../../core";

export const FilterButtons = (props: IGenresFilter): ReactElement<IGenresFilter> => {
  const [selectedGenre, setSelectedGenre] = useState(DEFAULT_GENRE);

  const toogleButton = (_: MouseEvent<HTMLElement>, genre: string) => {
    if (genre !== null) {
      setSelectedGenre(genre);
    }
  };

  useEffect(() => props.selected(selectedGenre), [selectedGenre]);

  return (
    <ToggleButtonGroup
      className="app-filter-buttons"
      value={selectedGenre}
      exclusive
      onChange={toogleButton}
      aria-label="text alignment"
    >
      <ToggleButton className="app-filter-buttons__toggle-button" value={DEFAULT_GENRE}>
        {DEFAULT_GENRE}
      </ToggleButton>
      {map(props?.genres?.all, (genre, index) => (
        <ToggleButton key={index} className="app-filter-buttons__toggle-button" value={genre}>
          {genre}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
