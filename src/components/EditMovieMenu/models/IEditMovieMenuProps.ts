import { DialogAction } from "../../../core";

/**
 * Interface for EditMovieMenu props
 */
export interface IEditMovieMenuProps {
  /**
   * Class name
   */
  className: string;

  /**
   * Callback fired when the component requests to be opened.
   */
  handleMenuOpen: (isOpened: boolean) => void;

  /**
   * Callback fired when the component requests to be handeled.
   */
  handleMenuAction: (action: DialogAction) => void;
}
