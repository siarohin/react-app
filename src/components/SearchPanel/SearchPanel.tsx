import React, { ReactElement } from "react";
import { useFormik } from "formik";

import "./SearchPanel.scss";
import { Button, TextField } from "../../shared";
import { ISearchPanelProps } from "./models";

export const SearchPanel = (props: ISearchPanelProps): ReactElement => {
  const { selected, onSubmit } = props;

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      searchInput: selected || ""
    },
    onSubmit: (values) => {
      const value: string = values.searchInput;
      const shouldUpdateValue: boolean = value !== selected;

      if (shouldUpdateValue) {
        onSubmit(value);
      }
    }
  });

  return (
    <div className="app-search-panel">
      <h3 className="app-search-panel__name">Find your movie</h3>
      <form className="app-search-panel__form" onSubmit={form.handleSubmit}>
        <TextField
          className="app-search-panel__form-field"
          name="searchInput"
          value={form.values.searchInput}
          placeholder="What do you want to watch?"
          variant="filled"
          type="text"
          onChange={form.handleChange}
        />
        <Button type="submit" className="app-search-panel__form-button">
          Search
        </Button>
      </form>
    </div>
  );
};
