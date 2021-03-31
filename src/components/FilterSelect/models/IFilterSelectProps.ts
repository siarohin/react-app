import { UserPreferencesModels } from "../../../core";

/**
 * Interface for IFilterSelect props
 */
export interface IFilterSelectProps {
  /**
   * Sorting options
   */
  sortingOptions: UserPreferencesModels.ISortingOptions;

  /**
   * Callback fired when the component requests to change selected option.
   */
  changeSorting: (selected: string) => void;
}
