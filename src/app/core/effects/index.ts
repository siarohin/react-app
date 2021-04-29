import { combineEpics } from "redux-observable";

import { movieEffects } from "./movies.effect";
import { userPreferencesEffects } from "./user-preferences.effect";
import { toastEffects } from "./toast.effect";

export * from "./common.util";

export const effects = combineEpics(movieEffects, userPreferencesEffects, toastEffects);
