import { createSlice } from "@reduxjs/toolkit";
import { exerciseExtraReducers } from "@src/store/thunk";
import { exerciseToStatus, calculateNextUpdateHour } from "@src/utils";
import { EXERCISES } from "@src/configs";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialExerciseState: IExerciseState = {
  isFetch: false,
  isLoad: false,
  isUpdate: false,
  lastUpdated: "",
  nextUpdate: null,
  exercises: {},
  exerciseNames: [],
  updateStatus: [],
  enableUpdate: false,
  weekStatistics: [],
  selectedChartIndex: null,
  selectedStatistics: null,
};

export const exerciseSlice = createSlice({
  name: "exerciseSlice",
  initialState: initialExerciseState,
  reducers: {
    selectExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      state.exercises[name] = { value: "" };
      state.exerciseNames = Object.keys(state.exercises);
    },
    removeExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      delete state.exercises[name];
      state.exerciseNames = Object.keys(state.exercises);
    },
    changeExercise: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;

      state.exercises[name].value = value;
    },
    calculateUpdateStatus: (state) => {
      const updateStatus = exerciseToStatus(state.exercises);
      const enableUpdate = updateStatus.some((stat) => stat.value);
      const nextUpdate = calculateNextUpdateHour(state.lastUpdated);

      state.updateStatus = updateStatus;
      state.enableUpdate = enableUpdate;
      state.nextUpdate = nextUpdate;
    },
    clearExerciseState: (state) => {
      const { exercises } = state;
      const newExercises: IExercises = {};

      Object.keys(exercises).forEach((exerciseName) => {
        if (exercises?.[exerciseName]?.value) {
          newExercises[exerciseName] = { value: "" };
        }
      });

      const newExerciseNames = Object.keys(newExercises);

      state.isUpdate = false;
      state.exercises = newExercises;
      state.exerciseNames = newExerciseNames;
      state.enableUpdate = false;
    },
    selectStatistics: (state, action: PayloadAction<{ chartIndex: string | null }>) => {
      const { chartIndex } = action.payload;

      if (chartIndex) {
        if (chartIndex !== state.selectedChartIndex) {
          const selected = state.weekStatistics[Number(chartIndex)];

          state.selectedStatistics = {
            exercises: Object.keys(selected.exercises).map((exerciseName) => ({
              name: exerciseName,
              value: selected.exercises[exerciseName].value,
              unit: EXERCISES[exerciseName].unit,
            })),
            status: exerciseToStatus(selected.exercises),
            updated: selected.updated,
          };
          state.selectedChartIndex = chartIndex;
        }
      } else {
        state.selectedStatistics = null;
        state.selectedChartIndex = null;
      }
    },
  },
  extraReducers: exerciseExtraReducers,
});

export const {
  selectExercise,
  removeExercise,
  changeExercise,
  calculateUpdateStatus,
  clearExerciseState,
  selectStatistics,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
