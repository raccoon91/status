import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCISE_NAMES } from "@src/configs";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRootState } from "./index";

export interface IExerciseState {
  fetching: boolean;
  loading: boolean;
  exercises: { [key in string]: IExerciseValues };
  exerciseNames: string[];
  saveExercise: boolean;
}

const initialExerciseState: IExerciseState = {
  fetching: false,
  loading: false,
  exercises: {},
  exerciseNames: EXERCISE_NAMES,
  saveExercise: false,
};

export const getExercises = createAsyncThunk<{
  exercises: { [key in string]: IExerciseValues };
  exerciseNames: string[];
}>("exercise/getExercises", async () => {
  const storageExercises = await AsyncStorage.getItem("@exercise");

  if (storageExercises != null) {
    const exercises = JSON.parse(storageExercises);

    return { exercises, exerciseNames: EXERCISE_NAMES.filter((exercise) => !exercises[exercise]) };
  } else {
    return { exercises: {}, exerciseNames: EXERCISE_NAMES };
  }
});

export const postExercies = createAsyncThunk("exercise/postExercies", async (_, { getState }) => {
  const state = getState() as IRootState;
  const { exercises } = state.exercise;

  const savedExercises: { [key in string]: IExerciseValues } = {};

  Object.values(exercises).forEach((exercise) => {
    savedExercises[exercise.name] = { name: exercise.name, value: "" };
  });

  AsyncStorage.setItem("@exercise", JSON.stringify(savedExercises));
});

export const exercise = createSlice({
  name: "exercise",
  initialState: initialExerciseState,
  reducers: {
    selectExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      state.exercises[name] = { name, value: "" };
      state.exerciseNames = EXERCISE_NAMES.filter((exerciseName) => !state.exercises[exerciseName]);
    },
    removeExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      delete state.exercises[name];
      state.exerciseNames = EXERCISE_NAMES.filter((exerciseName) => !state.exercises[exerciseName]);
    },
    updateExercise: (state, action: PayloadAction<{ name: string; value: string }>) => {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExercises.pending, (state) => {
        state.loading = true;
        state.fetching = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        const { exercises, exerciseNames } = action.payload;

        state.exercises = exercises;
        state.exerciseNames = exerciseNames;
        state.loading = false;
      });
  },
});

export const { selectExercise, removeExercise, updateExercise } = exercise.actions;

export default exercise.reducer;
