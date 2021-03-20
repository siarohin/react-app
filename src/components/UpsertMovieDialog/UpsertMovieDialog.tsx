/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, ReactElement, useEffect } from "react";
import { FormBuilder, FieldGroup, FieldControl, Validators, Handler, InputType, FormGroup } from "react-reactive-form";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, TextField, IconButton } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import union from "lodash/union";
import sortBy from "lodash/sortBy";
import keys from "lodash/keys";

import "./UpsertMovieDialog.scss";
import { MoviesModels } from "../../core";
import { IMovieDialog } from "../../models";
import { getFormControlValue } from "./utils";

export const UpsertMovieDialog = (props: Omit<IMovieDialog, "onDelete">): ReactElement<IMovieDialog> => {
  const { onClose, onSubmit, open, dialogSettings, genres } = props;

  const form: FormGroup = FormBuilder.group({
    id: [{ value: "", disabled: true }],
    title: ["", Validators.required],
    releaseDate: ["", Validators.required],
    posterPath: ["", Validators.required],
    genres: ["", Validators.required],
    overview: ["", Validators.required],
    runtime: ["", Validators.required]
  });

  const initFormValues = (): void => {
    keys(form.controls).forEach((controlName: keyof MoviesModels.IMovie) => {
      form.patchValue({
        [controlName]: getFormControlValue(controlName, dialogSettings?.values as MoviesModels.IMovie)
      });
    });
  };

  useEffect(() => initFormValues(), [dialogSettings]);

  const handleGenreChange = (_: ChangeEvent, value: Array<string>): void => {
    form.patchValue({ genres: value });
    form.get("genres").markAsDirty();
  };

  const handleClose = (): void => onClose();

  const handleSubmit = (): void => {
    let movie: MoviesModels.IMovie = { ...form.getRawValue(), runtime: Number(form.getRawValue().runtime) };
    const isEdit: boolean = !!dialogSettings?.values;

    if (isEdit) {
      movie = { ...dialogSettings.values, ...movie };
    }

    onSubmit(movie);
  };

  const FormInput = ({
    handler,
    touched,
    hasError,
    meta
  }: {
    handler: (inputType?: InputType, value?: string) => Handler;
    touched: boolean;
    hasError: (errorCode: string, path?: string | Array<number> | string) => boolean;
    meta: { [key: string]: any };
  }) => (
    <div className="app-upsert-movie-dialog__content-row">
      <h3 className="app-upsert-movie-dialog__content-title">{meta.title}</h3>
      <TextField
        className="app-upsert-movie-dialog__content-input"
        placeholder={meta.placeholder}
        variant="filled"
        error={touched && hasError("required")}
        type={meta.type}
        {...handler()}
      />
    </div>
  );

  const FormAutoComplete = ({ meta }: { meta: { [key: string]: any } }) => (
    <div className="app-upsert-movie-dialog__content-row">
      <h3 className="app-upsert-movie-dialog__content-title">{meta.title}</h3>
      <Autocomplete
        className="app-upsert-movie-dialog__autocomplete"
        onChange={handleGenreChange}
        multiple
        disableCloseOnSelect
        size="small"
        options={sortBy(union(genres, form?.controls?.genres?.value))}
        getOptionLabel={(option) => option}
        value={form.get("genres").value}
        getOptionSelected={(option, value) => option === value}
        renderOption={(option, { selected }) => (
          <>
            <Checkbox icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} checked={selected} />
            {option}
          </>
        )}
        renderInput={(params) => (
          <TextField
            className="app-upsert-movie-dialog__content-input"
            variant="filled"
            {...params}
            placeholder={meta.placeholder}
            type={meta.type}
          />
        )}
      />
    </div>
  );

  return (
    <Dialog fullWidth maxWidth="md" disableScrollLock={true} open={open} onClose={handleClose}>
      <IconButton className="app-upsert-movie-dialog__close-button" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <FieldGroup
        control={form}
        render={({ pristine, invalid }) => (
          <form className="app-upsert-movie-dialog__form">
            <h2 className="app-upsert-movie-dialog__title">{dialogSettings?.title}</h2>
            <DialogContent className="app-upsert-movie-dialog__content">
              {form.get("id").value ? (
                <FieldControl
                  name="id"
                  render={FormInput}
                  meta={{ title: "Movie id", type: "text", placeholder: "" }}
                />
              ) : null}
              <FieldControl
                name="title"
                render={FormInput}
                meta={{ title: "Title", type: "text", placeholder: "Select Title" }}
              />
              <FieldControl
                name="releaseDate"
                render={FormInput}
                meta={{
                  title: "Release date",
                  type: "date",
                  placeholder: "Select Date"
                }}
              />
              <FieldControl
                name="posterPath"
                render={FormInput}
                meta={{
                  title: "Movie URL",
                  type: "text",
                  placeholder: "Movie URL here"
                }}
              />
              <FieldControl
                name="genres"
                render={FormAutoComplete}
                meta={{ title: "Genres", type: "text", placeholder: "Select genre" }}
              />
              <FieldControl
                name="overview"
                render={FormInput}
                meta={{
                  title: "Overview",
                  type: "text",
                  placeholder: "Overview here"
                }}
              />
              <FieldControl
                name="runtime"
                render={FormInput}
                meta={{
                  title: "Runtime",
                  type: "number",
                  placeholder: "Runtime here"
                }}
              />
            </DialogContent>
            <DialogActions className="app-upsert-movie-dialog__action">
              <Button
                className="app-upsert-movie-dialog__button app-upsert-movie-dialog__button--reset"
                onClick={initFormValues}
              >
                Reset
              </Button>
              <Button className="app-upsert-movie-dialog__button" onClick={handleSubmit} disabled={pristine || invalid}>
                Submit
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
};
