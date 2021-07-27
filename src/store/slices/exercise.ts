import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCISES, EXERCISE_NAMES } from "@src/configs";
import Toast from "react-native-toast-message";
import { postStatus } from "./status";
import { postStats } from "./stats";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRootState, IRejectValue } from "./index";
import dayjs from "dayjs";

export interface IExerciseState {
  isFetch: boolean;
  isLoad: boolean;
  isUpdate: boolean;
  updated: string;
  exercises: { [key: string]: IExerciseValues };
  exerciseNames: string[];
  updateStatus: { [name: string]: { name: string; value: number } };
  enableUpdate: boolean;
}

const initialExerciseState: IExerciseState = {
  isFetch: false,
  isLoad: false,
  isUpdate: false,
  updated: "",
  exercises: {},
  exerciseNames: EXERCISE_NAMES,
  updateStatus: {},
  enableUpdate: false,
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

export const postExercies = createAsyncThunk<void, void, IRejectValue>(
  "exercise/postExercies",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as IRootState;
    const { exercises, updated: lastUpdated, updateStatus } = state.exercise;
    const { status } = state.status;
    const updated = dayjs().format("YYYY-MM-DD HH:mm");

    if (lastUpdated) {
      if (!dayjs(lastUpdated).isBefore(dayjs(updated), "day")) {
        return rejectWithValue({ type: "info", message: "you can update status after a day" });
      }

      if (!dayjs(lastUpdated).isBefore(dayjs(updated).subtract(6, "hour"))) {
        return rejectWithValue({ type: "info", message: "you can update status after six hour" });
      }
    }

    const storageExercises: { [key: string]: IExerciseValues } = {};

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
  },
);

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
        state.enableUpdate = true;
      } else {
        state.enableUpdate = false;
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
    clearExerciseState: (state) => {
      state.isUpdate = false;
      const newExercises: { [key: string]: IExerciseValues } = {};

      state.exerciseNames.forEach((name) => {
        newExercises[name] = { name, value: "" };
      });

      state.exercises = newExercises;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExercises.pending, (state) => {
        state.isLoad = true;
        state.isFetch = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        const { exercises, exerciseNames, updated } = action.payload;

        state.exercises = exercises;
        state.exerciseNames = exerciseNames;
        state.updated = updated;
        state.isLoad = false;
      })
      .addCase(postExercies.fulfilled, (state) => {
        state.isUpdate = true;
        state.updateStatus = {};
      })
      .addCase(postExercies.rejected, (state, action) => {
        if (action?.payload) {
          const { type, message } = action.payload;

          if (type === "info") {
            Toast.show({ type, text1: "Error", text2: message });
          }
        }
      });
  },
});

export const { selectExercise, removeExercise, changeExercise, calculateUpdateStatus, clearExerciseState } =
  exercise.actions;

export default exercise.reducer;
