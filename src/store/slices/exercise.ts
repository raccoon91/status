import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { postStatus } from "./main";
import { postStatistics } from "./statistics";
import { STATUS_INDEX, EXERCISES, EXERCISE_NAMES } from "@src/configs";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRootState, IRejectValue } from "./index";

export interface IExerciseState {
  isFetch: boolean;
  isLoad: boolean;
  isUpdate: boolean;
  lastUpdated: string;
  exercises: { [key: string]: IExercise };
  exerciseNames: string[];
  updateStatus: IStatus[];
  enableUpdate: boolean;
}

const initialExerciseState: IExerciseState = {
  isFetch: false,
  isLoad: false,
  isUpdate: false,
  lastUpdated: "",
  exercises: {},
  exerciseNames: EXERCISE_NAMES,
  updateStatus: [],
  enableUpdate: false,
};

export const getExercises = createAsyncThunk<{
  exercises: { [key: string]: IExercise };
  exerciseNames: string[];
  updated: string;
}>("exercise/getExercises", async () => {
  const storageExercises = await AsyncStorage.getItem("@exercise");

  if (storageExercises !== null) {
    const { exercises, updated } = JSON.parse(storageExercises);

    return { exercises, exerciseNames: EXERCISE_NAMES.filter((exerciseName) => !exercises[exerciseName]), updated };
  } else {
    return { exercises: {}, exerciseNames: EXERCISE_NAMES, updated: "" };
  }
});

export const postExercies = createAsyncThunk<{ updated: string }, void, IRejectValue>(
  "exercise/postExercies",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as IRootState;
    const { exercises, lastUpdated, updateStatus } = state.exercise;
    const { status } = state.main;
    const updated = dayjs().format("YYYY-MM-DD HH:mm");

    if (lastUpdated) {
      if (!dayjs(lastUpdated).isBefore(dayjs(updated), "day")) {
        return rejectWithValue({ type: "info", message: "you can update status after a day" });
      }
      if (!dayjs(lastUpdated).isBefore(dayjs(updated).subtract(6, "hour"))) {
        return rejectWithValue({ type: "info", message: "you can update status after six hour" });
      }
    }

    const storageExercises: { [key: string]: IExercise } = {};

    Object.keys(exercises).forEach((exerciseName) => {
      storageExercises[exerciseName] = { value: "" };
    });

    await AsyncStorage.setItem("@exercise", JSON.stringify({ exercises: storageExercises, updated }));

    const newStatus = status.map((stat) => ({
      name: stat.name,
      value: stat.value + updateStatus[STATUS_INDEX[stat.name]].value,
    }));

    dispatch(postStatistics({ status: updateStatus, updated }));
    dispatch(postStatus(newStatus));
    return { updated };
  },
);

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
      const updateStatus: IStatus[] = [];

      Object.keys(state.exercises).forEach((exerciseName) => {
        const status = EXERCISES?.[exerciseName]?.status || [];

        if (status.length > 0) {
          status.forEach((stat) => {
            const updateValue = Number(state.exercises[exerciseName].value) * stat.rate;

            if (updateStatus?.[STATUS_INDEX[stat.name]]) {
              updateStatus[STATUS_INDEX[stat.name]].value += updateValue;
            } else {
              updateStatus[STATUS_INDEX[stat.name]] = {
                name: stat.name,
                value: updateValue,
              };
            }

            if (updateStatus[STATUS_INDEX[stat.name]].value <= 0) {
              updateStatus.splice(STATUS_INDEX[stat.name], 1);
            }
          });
        }
      });

      state.updateStatus = updateStatus;
    },
    clearExerciseState: (state) => {
      state.isUpdate = false;
      const newExercises: { [key: string]: IExercise } = {};

      state.exerciseNames.forEach((name) => {
        newExercises[name] = { value: "" };
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
        state.lastUpdated = updated;
        state.isLoad = false;
      })
      .addCase(postExercies.fulfilled, (state, action) => {
        const { updated } = action.payload;

        state.isUpdate = true;
        state.lastUpdated = updated;
        state.updateStatus = [];
      })
      .addCase(postExercies.rejected, (_, action) => {
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
  exerciseSlice.actions;

export default exerciseSlice.reducer;
