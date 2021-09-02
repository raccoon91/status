import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import user from "./user";
import status from "./status";
import exercise from "./exercise";

const rootReducer = (state: IRootState | undefined, action: AnyAction) => {
  const combineReducer = combineReducers({
    user,
    status,
    exercise,
  });

  return combineReducer(state, action);
};

export default rootReducer;
