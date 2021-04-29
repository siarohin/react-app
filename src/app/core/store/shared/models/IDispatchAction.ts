import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

import { ActionWithPayload } from "./IActionWithPayload";

/**
 * Interface for Action dispatcher
 */
export interface IDispatchAction {
  /**
   * Action dispatcher
   */
  dispatch: (action: ActionWithPayload<any>) => ActionCreatorWithoutPayload;
}
