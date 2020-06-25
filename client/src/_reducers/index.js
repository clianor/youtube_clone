import { combineReducers } from "redux";
import user from "./auth/user";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
