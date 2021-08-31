import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import user, { IUserState } from "./user";
import main, { IMainState } from "./main";
import exercise, { IExerciseState } from "./exercise";
import statistics, { IStatisticsState } from "./statistics";

export interface IRejectValue {
  rejectValue: {
    type: string;
    message: string;
  };
}

export interface IRootState {
  user: IUserState;
  main: IMainState;
  exercise: IExerciseState;
  statistics: IStatisticsState;
}

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
