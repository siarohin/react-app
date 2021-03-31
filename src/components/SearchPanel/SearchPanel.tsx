import React, { ChangeEvent, ReactElement, useMemo } from "react";

import "./SearchPanel.scss";
import { FormBuilder, FieldGroup, FieldControl, Handler, InputType, FormGroup, Button, TextField } from "../../shared";
import { ISearchPanelProps } from "./models";

export const SearchPanel = (props: ISearchPanelProps): ReactElement => {
  const { selected, onSubmit } = props;

  const form: FormGroup = useMemo(
    () =>
      FormBuilder.group({
        searchInput: [selected]
      }),
    []
  );

  const FormInput = ({
    handler,
    meta
  }: {
    handler: (inputType?: InputType, value?: string) => Handler;
    meta: { [key: string]: any };
  }) => (
    <TextField
      className="app-search-panel__form-field"
      placeholder={meta.placeholder}
      variant="filled"
      type={meta.type}
      {...handler()}
    />
  );

  const handleSubmit = (event: ChangeEvent<unknown>): void => {
    event.preventDefault();
    const value: string = form.getRawValue().searchInput;
    const shouldUpdateValue: boolean = value !== selected;

    if (shouldUpdateValue) {
      onSubmit(value);
    }
  };

  return (
    <div className="app-search-panel">
      <h3 className="app-search-panel__name">Find your movie</h3>
      <form className="app-search-panel__form" onSubmit={handleSubmit}>
        <FieldGroup
          control={form}
          render={() => (
            <FieldControl
              name="searchInput"
              render={FormInput}
              meta={{
                type: "text",
                placeholder: "What do you want to watch?"
              }}
            />
          )}
        />
        <Button type="submit" className="app-search-panel__form-button">
          Search
        </Button>
      </form>
    </div>
  );
};
