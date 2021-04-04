import React, { ChangeEvent, ReactElement } from "react";
import { useFormik } from "formik";
import union from "lodash/union";
import sortBy from "lodash/sortBy";

import "./UpsertMovieDialog.scss";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  IconButton,
  Autocomplete,
  CloseIcon,
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon
} from "../../shared";
import { MoviesModels } from "../../core";
import { IMovieDialog } from "../../models";
import { getFormattedDate } from "./utils";
import { requireValidator as validate } from "./validator";

export const UpsertMovieDialog = (props: Omit<IMovieDialog, "onDelete">): ReactElement<IMovieDialog> => {
  const { onClose, onSubmit, open, dialogSettings, genres } = props;

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dialogSettings?.values?.id,
      title: dialogSettings?.values?.title || "",
      releaseDate: dialogSettings?.values?.releaseDate || getFormattedDate(new Date()),
      posterPath: dialogSettings?.values?.posterPath || "",
      genres: dialogSettings?.values?.genres || [],
      overview: dialogSettings?.values?.overview || "",
      runtime: dialogSettings?.values?.runtime || ""
    },
    validate,
    onSubmit: (values) => {
      let movie: MoviesModels.IMovie = { ...values } as MoviesModels.IMovie;
      const isEdit: boolean = !!dialogSettings?.values;

      if (isEdit) {
        movie = { ...dialogSettings.values, ...movie };
      }

      onSubmit(movie);
    }
  });

  const handleGenreChange = (_: ChangeEvent, value: Array<string>): void => {
    form.setFieldValue("genres", value);
    form.setFieldTouched("genres", true);
  };

  const handleClose = (): void => onClose();

  return (
    <Dialog fullWidth maxWidth="md" disableScrollLock={true} open={open} onClose={handleClose}>
      <IconButton className="app-upsert-movie-dialog__close-button" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <form className="app-upsert-movie-dialog__form" onReset={form.handleReset} onSubmit={form.handleSubmit}>
        <h2 className="app-upsert-movie-dialog__title">{dialogSettings?.title}</h2>
        <DialogContent className="app-upsert-movie-dialog__content">
          {form.values.id ? (
            <div className="app-upsert-movie-dialog__content-row">
              <h3 className="app-upsert-movie-dialog__content-title">Movie id</h3>
              <TextField
                className="app-upsert-movie-dialog__content-input"
                name="id"
                value={form.values.id}
                variant="filled"
                type="number"
                disabled
              />
            </div>
          ) : null}

          <div className="app-upsert-movie-dialog__content-row">
            <h3 className="app-upsert-movie-dialog__content-title">Title</h3>
            <TextField
              className="app-upsert-movie-dialog__content-input"
              name="title"
              value={form.values.title}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Select Title"
              variant="filled"
              type="text"
              error={form.touched.title && !!form.errors.title}
            />
          </div>

          <div className="app-upsert-movie-dialog__content-row">
            <h3 className="app-upsert-movie-dialog__content-title">Release date</h3>
            <TextField
              className="app-upsert-movie-dialog__content-input"
              name="releaseDate"
              value={form.values.releaseDate}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Select Date"
              variant="filled"
              type="date"
              error={form.touched.releaseDate && !!form.errors.releaseDate}
            />
          </div>

          <div className="app-upsert-movie-dialog__content-row">
            <h3 className="app-upsert-movie-dialog__content-title">Movie URL</h3>
            <TextField
              className="app-upsert-movie-dialog__content-input"
              name="posterPath"
              value={form.values.posterPath}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Movie URL here"
              variant="filled"
              type="text"
              error={form.touched.posterPath && !!form.errors.posterPath}
            />
          </div>

          <div className="app-upsert-movie-dialog__content-row">
            <h3 className="app-upsert-movie-dialog__content-title">Genres</h3>
            <Autocomplete
              className="app-upsert-movie-dialog__autocomplete"
              onChange={handleGenreChange}
              multiple
              disableCloseOnSelect
              size="small"
              options={sortBy(union(genres?.all, form?.values?.genres))}
              getOptionLabel={(option) => option}
              value={form.values.genres}
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
                  name="genres"
                  onBlur={form.handleBlur}
                  variant="filled"
                  {...params}
                  value={form.values.genres}
                  placeholder="Select genre"
                  type="text"
                  error={form.touched.genres && !!form.errors.genres}
                />
              )}
            />
          </div>

          <div className="app-upsert-movie-dialog__content-row">
            <h3 className="app-upsert-movie-dialog__content-title">Overview</h3>
            <TextField
              className="app-upsert-movie-dialog__content-input"
              name="overview"
              value={form.values.overview}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Overview here"
              variant="filled"
              type="text"
              error={form.touched.overview && !!form.errors.overview}
            />
          </div>

          <div className="app-upsert-movie-dialog__content-row">
            <h3 className="app-upsert-movie-dialog__content-title">Runtime</h3>
            <TextField
              className="app-upsert-movie-dialog__content-input"
              name="runtime"
              value={form.values.runtime}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Runtime here"
              variant="filled"
              type="number"
              error={form.touched.runtime && !!form.errors.runtime}
            />
          </div>
        </DialogContent>
        <DialogActions className="app-upsert-movie-dialog__action">
          <Button type="reset" className="app-upsert-movie-dialog__button app-upsert-movie-dialog__button--reset">
            Reset
          </Button>
          <Button type="submit" className="app-upsert-movie-dialog__button" disabled={!form.dirty || !form.isValid}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
