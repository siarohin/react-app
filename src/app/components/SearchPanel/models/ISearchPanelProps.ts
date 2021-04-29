/**
 * Interface for SeachPanel props
 */
export interface ISearchPanelProps {
  /**
   * Selected value
   */
  selected: string;

  /**
   * Callback fired when the component requests to send changes.
   */
  onSubmit: (value: string) => void;
}
