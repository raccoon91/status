import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postStatus } from "./status";
import { postStats } from "./stats";
import { EXERCISES, EXERCISE_NAMES } from "@src/configs";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRootState } from "./index";
import dayjs from "dayjs";

export interface IExerciseState {
  fetching: boolean;
  loading: boolean;
  updated: string;
  exercises: { [key: string]: IExerciseValues };
  exerciseNames: string[];
  updateStatus: { [name: string]: { name: string; value: number } };
  saveExercise: boolean;
}

const initialExerciseState: IExerciseState = {
  fetching: false,
  loading: false,
  updated: "",
  exercises: {},
  exerciseNames: EXERCISE_NAMES,
  updateStatus: {},
  saveExercise: false,
};

export const getExercises = createAsyncThunk<{
  exercises: { [key: string]: IExerciseValues };
  exerciseNames: string[];
  updated: string;
}>("exercise/getExercises", async () => {
  const storageExercises = await AsyncStorage.getItem("@exercise");

  if (storageExercises != null) {
    const { exercises, updated } = JSON.parse(storageExercises);

    return { exercises, exerciseNames: EXERCISE_NAMES.filter((exercise) => !exercises[exercise]), updated };
  } else {
    return { exercises: {}, exerciseNames: EXERCISE_NAMES, updated: "" };
  }
});

export const postExercies = createAsyncThunk("exercise/postExercies", async (_, { getState, dispatch }) => {
  const state = getState() as IRootState;
  const { exercises, updateStatus } = state.exercise;
  const { status } = state.status;

  const storageExercises: { [key: string]: IExerciseValues } = {};
  const updated = dayjs().format("YYYY-MM-DD HH:mm");

  Object.values(exercises).forEach((exercise) => {
    storageExercises[exercise.name] = { name: exercise.name, value: "" };
  });

  await AsyncStorage.setItem("@exercise", JSON.stringify({ exercises: storageExercises, updated }));

  const newStatus = status.map((targetStatus) => ({
    name: targetStatus.name,
    value: targetStatus.value + updateStatus[targetStatus.name].value,
  }));

  dispatch(postStats({ status: Object.values(updateStatus), updated }));
  dispatch(postStatus(newStatus));
});

export const exercise = createSlice({
  name: "exercise",
  initialState: initialExerciseState,
  reducers: {
    selectExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      const selectedExercise = EXERCISES[name];

      state.exercises[name] = { name, value: "", unit: selectedExercise.unit };
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
        state.saveExercise = true;
      } else {
        state.saveExercise = false;
      }
    },
    calculateUpdateStatus: (state) => {
      const newUpdateStatus: { [name: string]: { name: string; value: number } } = {};

      Object.values(state.exercises).forEach((savedExercise) => {
        const exerciseStatus = EXERCISES?.[savedExercise.name]?.status || [];

        if (exerciseStatus.length > 0) {
          exerciseStatus.forEach((status) => {
            if (newUpdateStatus?.[status.name]) {
              newUpdateStatus[status.name].value += Number(savedExercise.value) * status.rate;
            } else {
              newUpdateStatus[status.name] = { name: status.name, value: Number(savedExercise.value) * status.rate };
            }
          });
        }
      });

      state.updateStatus = newUpdateStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExercises.pending, (state) => {
        state.loading = true;
        state.fetching = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        const { exercises, exerciseNames, updated } = action.payload;

        state.exercises = exercises;
        state.exerciseNames = exerciseNames;
        state.updated = updated;
        state.loading = false;
      });
  },
});

export const { selectExercise, removeExercise, changeExercise, calculateUpdateStatus } = exercise.actions;

export default exercise.reducer;
