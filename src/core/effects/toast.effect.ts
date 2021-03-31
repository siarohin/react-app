import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import Notifications from "react-notification-system-redux";
import { map } from "rxjs/operators";

import { ToastActions, SharedModels } from "../store";

/**
 * Effect for processing SHOW_SUCCESS_TOAST action
 */
const showSuccessToast$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(ToastActions.showSuccessToast),
    map(({ payload }) =>
      Notifications.success({
        title: "Success",
        message: payload.message,
        position: "br",
        autoDismiss: 3
      })
    )
  );

/**
 * Effect for processing SHOW_FAIL_TOAST action
 */
const showFailToast$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
  action$.pipe(
    ofType(ToastActions.showFailToast),
    map(({ payload }) =>
      Notifications.error({
        title: "Error",
        message: payload.message,
        position: "br",
        autoDismiss: 3
      })
    )
  );

export const toastEffects = combineEpics(showSuccessToast$, showFailToast$);
