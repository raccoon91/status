import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import status, { IStatusState } from "./status";
import exercise, { IExerciseState } from "./exercise";
import stats, { IStatsState } from "./stats";

export interface IRejectValue {
  rejectValue: {
    name: string;
    message?: string;
    type?: string;
  };
}

export interface IRootState {
  status: IStatusState;
  exercise: IExerciseState;
  stats: IStatsState;
}

const rootReducer = (state: IRootState | undefined, action: AnyAction) => {
  const combineReducer = combineReducers({
    status,
    exercise,
    stats,
  });

  return combineReducer(state, action);
};

export default rootReducer;
