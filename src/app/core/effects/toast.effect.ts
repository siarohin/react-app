import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import Notifications from "react-notification-system-redux";
import { map, takeUntil } from "rxjs/operators";

import { ToastActions, SharedModels, MoviesActions } from "../store";
import { notifyObservable } from "./common.util";

/**
 * Effect for processing SHOW_SUCCESS_TOAST action
 */
const showSuccessToast$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$
    .pipe(
      ofType(ToastActions.showSuccessToast),
      map(({ payload }) =>
        Notifications.success({
          title: "Success",
          message: payload.message,
          position: "br",
          autoDismiss: 3
        })
      )
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

/**
 * Effect for processing SHOW_FAIL_TOAST action
 */
const showFailToast$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$
    .pipe(
      ofType(ToastActions.showFailToast),
      map(({ payload }) =>
        Notifications.error({
          title: "Error",
          message: payload.message,
          position: "br",
          autoDismiss: 3
        })
      )
    )
    .pipe(takeUntil(notifyObservable(action$, MoviesActions.loadMoviesComplete)));

export const toastEffects = combineEpics(showSuccessToast$, showFailToast$);
