import { Action } from "redux";

/**
 * Action with payload interface
 */
export interface ActionWithPayload<T> extends Action {
  payload: T;
}
