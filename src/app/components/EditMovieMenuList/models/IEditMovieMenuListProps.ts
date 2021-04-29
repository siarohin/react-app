/**
 * Interface for IEditMovieMenuList props
 */
export interface IEditMovieMenuListProps {
  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the menu.
   */
  anchorEl: HTMLElement | null;

  /**
   * Callback fired when the component requests to be closed.
   */
  handleClose: () => void;

  /**
   * Callback fired when the component requests to be deleted.
   */
  handleDelete: () => void;

  /**
   * Callback fired when the component requests to be edited.
   */
  handleEdit: () => void;
}
