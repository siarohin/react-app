import { MoviesModels } from "../../../core";
import { getFormattedDate } from "./get-formatted-date.util";

/**
 * Returns control's value according the dialog settings
 */
export const getFormControlValue = (
  controlName: keyof MoviesModels.IMovie,
  movie: MoviesModels.IMovie
): MoviesModels.IMovie[keyof MoviesModels.IMovie] => {
  switch (controlName) {
    case "releaseDate":
      return movie?.[controlName] || getFormattedDate(new Date());
    case "genres":
      return movie?.[controlName] || [];
    default:
      return movie?.[controlName];
  }
};
