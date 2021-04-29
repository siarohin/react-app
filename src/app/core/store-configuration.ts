import { applyMiddleware, createStore, compose, Store } from "redux";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";

import { reducers, State } from "./store";
import { isServer } from "./constants";

function getComposeEnhancers(): any {
  if (!isServer) {
    return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  return compose;
}

export interface AppStore {
  store: Store;
  runEffects: (effects$?: Array<Epic>) => void;
}

/**
 * Store configuration
 */
export function configureStore(initialState: State = {} as State): AppStore {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers = getComposeEnhancers();
  const middlewares = [epicMiddleware];

  const store: Store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));

  return {
    store,
    runEffects: (effects$?: Array<Epic>) =>
      effects$
        ? epicMiddleware.run(combineEpics(...effects$))
        : // eslint-disable-next-line no-console
          console.warn("Effects are not running, no epics array was provided")
  };
}
