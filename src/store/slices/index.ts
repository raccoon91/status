import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import status, { IStatusState } from "./status";
import exercise, { IExerciseState } from "./exercise";

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
}

const rootReducer = (state: IRootState | undefined, action: AnyAction) => {
  const combineReducer = combineReducers({
    status,
    exercise,
  });

  return combineReducer(state, action);
};

export default rootReducer;
