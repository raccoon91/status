import { createSlice } from "@reduxjs/toolkit";
import { exerciseExtraReducers } from "src/store/thunk";
import { STATUS_INDEX, EXERCISES, EXERCISE_NAMES } from "@src/configs";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialExerciseState: IExerciseState = {
  isFetch: false,
  isLoad: false,
  isUpdate: false,
  lastUpdated: "",
  exercises: {},
  exerciseNames: EXERCISE_NAMES,
  displayUpdateStatus: false,
  updateStatus: [],
  enableUpdate: false,
};

export const exerciseSlice = createSlice({
  name: "exerciseSlice",
  initialState: initialExerciseState,
  reducers: {
    selectExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      const selectedExercise = EXERCISES[name];

      state.exercises[name] = { value: "", unit: selectedExercise.unit };
      state.exerciseNames = EXERCISE_NAMES.filter((exerciseName) => !state.exercises[exerciseName]);
    },
    removeExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      delete state.exercises[name];
      state.exerciseNames = EXERCISE_NAMES.filter((exerciseName) => !state.exercises[exerciseName]);
    },
    changeExercise: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;

      if (state.exercises?.[name]) {
        state.exercises[name].value = value;
      }

      if (Object.values(state.exercises).some((item) => item.value)) {
        state.enableUpdate = true;
      } else {
        state.enableUpdate = false;
      }
    },
    calculateUpdateStatus: (state) => {
      let displayUpdateStatus = false;
      const updateStatus: IStatus[] = [];

      Object.keys(state.exercises).forEach((exerciseName) => {
        const status = EXERCISES?.[exerciseName]?.status || [];

        if (status.length > 0) {
          status.forEach((stat) => {
            const exerciseValue = Number(state.exercises[exerciseName].value);
            const updateValue = Number(state.exercises[exerciseName].value) * stat.rate;

            if (exerciseValue) {
              displayUpdateStatus = true;
            }

            if (updateStatus?.[STATUS_INDEX[stat.name]]) {
              updateStatus[STATUS_INDEX[stat.name]].value += updateValue;
            } else {
              updateStatus[STATUS_INDEX[stat.name]] = {
                name: stat.name,
                value: updateValue,
              };
            }

            if (updateStatus[STATUS_INDEX[stat.name]].value >= 500) {
              updateStatus[STATUS_INDEX[stat.name]].value = 500;
            }

            if (updateStatus[STATUS_INDEX[stat.name]].value <= 0) {
              updateStatus.splice(STATUS_INDEX[stat.name], 1);
            }
          });
        }
      });

      state.displayUpdateStatus = displayUpdateStatus;
      state.updateStatus = updateStatus;
    },
    clearExerciseState: (state) => {
      const { exercises } = state;
      const newExercises: { [key: string]: IExercise } = {};

      Object.keys(exercises).forEach((exerciseName) => {
        if (exercises?.[exerciseName]?.value) {
          newExercises[exerciseName] = { value: "", unit: EXERCISES?.[exerciseName]?.unit || "" };
        }
      });

      const newExerciseNames = EXERCISE_NAMES.filter((exerciseName) => !newExercises[exerciseName]);

      state.isUpdate = false;
      state.exercises = newExercises;
      state.exerciseNames = newExerciseNames;
      state.displayUpdateStatus = false;
      state.enableUpdate = false;
    },
  },
  extraReducers: exerciseExtraReducers,
});

export const { selectExercise, removeExercise, changeExercise, calculateUpdateStatus, clearExerciseState } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
