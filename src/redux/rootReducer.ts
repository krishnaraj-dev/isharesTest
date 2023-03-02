import { combineReducers } from "redux";
import isharesReducer from "./ishares/reducer";

const rootReducer = combineReducers({
  IshareState: isharesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
