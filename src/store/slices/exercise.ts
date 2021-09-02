import { createSlice } from "@reduxjs/toolkit";
import { exerciseExtraReducers } from "@src/store/thunk";
import { EXERCISES, EXERCISE_NAMES } from "@src/configs";
import { exerciseToStatus } from "@src/utils";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialExerciseState: IExerciseState = {
  isFetch: false,
  isLoad: false,
  isUpdate: false,
  lastUpdated: "",
  exercises: {},
  exerciseNames: EXERCISE_NAMES,
  updateStatus: [],
  enableUpdate: false,
  statistics: null,
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

      state.exercises[name].value = value;
    },
    calculateUpdateStatus: (state) => {
      const updateStatus = exerciseToStatus(state.exercises);
      const enableUpdate = updateStatus.some((stat) => stat.value);

      state.enableUpdate = enableUpdate;
      state.updateStatus = updateStatus;
    },
    clearExerciseState: (state) => {
      const { exercises } = state;
      const newExercises: IExercises = {};

      Object.keys(exercises).forEach((exerciseName) => {
        if (exercises?.[exerciseName]?.value) {
          newExercises[exerciseName] = { value: "", unit: EXERCISES?.[exerciseName]?.unit || "" };
        }
      });

      const newExerciseNames = EXERCISE_NAMES.filter((exerciseName) => !newExercises[exerciseName]);

      state.isUpdate = false;
      state.exercises = newExercises;
      state.exerciseNames = newExerciseNames;
      state.enableUpdate = false;
    },
  },
  extraReducers: exerciseExtraReducers,
});

export const { selectExercise, removeExercise, changeExercise, calculateUpdateStatus, clearExerciseState } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
