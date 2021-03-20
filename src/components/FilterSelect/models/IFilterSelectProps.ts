import { ISortingOptions } from "../../../models";

/**
 * Interface for IFilterSelect props
 */
export interface IFilterSelectProps {
  /**
   * Sorting options
   */
  sortingOptions: ISortingOptions;

  /**
   * Callback fired when the component requests to change selected option.
   */
  changeSorting: (selected: string) => void;
}
