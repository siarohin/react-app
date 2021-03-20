import { combineEpics } from "redux-observable";
import { movieEffects } from "./movies.effect";

export const effects = combineEpics(movieEffects);
