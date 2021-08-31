import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import user from "./user";
import main from "./main";
import exercise from "./exercise";
import statistics from "./statistics";

const rootReducer = (state: IRootState | undefined, action: AnyAction) => {
  const combineReducer = combineReducers({
    user,
    main,
    exercise,
    statistics,
  });

  return combineReducer(state, action);
};

export default rootReducer;
