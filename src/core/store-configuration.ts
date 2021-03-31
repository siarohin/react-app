import { applyMiddleware, createStore, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import { effects } from "./effects";
import { reducers, State } from "./store";

const epicMiddleware = createEpicMiddleware();

/**
 * Store configuration
 */
export function configureStore(): Store<State> {
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(effects);

  return store;
}
