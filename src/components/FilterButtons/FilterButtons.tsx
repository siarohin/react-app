import React, { ReactElement, MouseEvent, useState, useEffect } from "react";
import map from "lodash/map";

import "./FilterButtons.scss";
import { ToggleButtonGroup, ToggleButton } from "../../shared";
import { DEFAULT_GENRE, UserPreferencesModels } from "../../core";

export const FilterButtons = (
  props: Omit<UserPreferencesModels.IGenresFilter, "changeSorting" | "count" | "sortingOptions">
): ReactElement<UserPreferencesModels.IGenresFilter> => {
  const { genres, selected } = props;

  const [selectedGenre, setSelectedGenre] = useState(DEFAULT_GENRE);

  const toogleButton = (_: MouseEvent<HTMLElement>, genre: string) => {
    if (genre !== null) {
      setSelectedGenre(genre);
    }
  };

  useEffect(() => selected(selectedGenre), [selectedGenre]);

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
      {map(genres?.all, (genre, index) => (
        <ToggleButton key={index} className="app-filter-buttons__toggle-button" value={genre}>
          {genre}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
