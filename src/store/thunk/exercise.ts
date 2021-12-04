import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import {
  getStorageStatistics,
  setStorageStatistics,
  calculateNextUpdateHour,
  validateExerciseHour,
  calculateExperience,
} from "@src/utils";
import { LIMIT_FREQUENT_UPDATE } from "@src/configs";
import { putUser } from "./user";
import { postStatus } from "./status";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getExercises = createAsyncThunk<
  {
    lastUpdated: string;
    exercises: IExercises;
    exerciseNames: string[];
    weekStatistics: IStatistics[];
  },
  void,
  IRejectValue
>("exercise/getExercises", async (_, { rejectWithValue }) => {
  try {
    const storageStatistics = await getStorageStatistics();

    if (storageStatistics.length) {
      const exercises: IExercises = {};
      const weekStatistics = storageStatistics.slice(-7);
      const lastStatistics = weekStatistics[weekStatistics.length - 1] || [];
      const exerciseNames = Object.keys(lastStatistics.exercises);
      const lastUpdated = lastStatistics.updated;

      Object.keys(lastStatistics.exercises).forEach((exerciseName: string) => {
        exercises[exerciseName] = { value: "" };
      });

      return { lastUpdated, exercises, exerciseNames, weekStatistics };
    } else {
      return {
        lastUpdated: "",
        exercises: { "push up": { value: "" } },
        exerciseNames: ["push up"],
        weekStatistics: [],
      };
    }
  } catch (err) {
    console.error(err);

    return rejectWithValue({ type: "error", message: "fail to get exercise" });
  }
});

export const postExercies = createAsyncThunk<
  {
    updated: string;
    weekStatistics: IStatistics[];
  },
  void,
  IRejectValue
>("exercise/postExercies", async (_, { getState, rejectWithValue, dispatch }) => {
  try {
    const state = getState() as IRootState;
    const { exercises, lastUpdated } = state.exercise;
    const filteredExercises: IExercises = {};
    const currentDate = dayjs().format("YYYY-MM-DD HH:mm");

    if (LIMIT_FREQUENT_UPDATE && lastUpdated && !validateExerciseHour(lastUpdated, currentDate)) {
      return rejectWithValue({
        type: "info",
        title: "Info",
        message: "you can update status once a day and 8 hours after last update",
      });
    }

    Object.keys(exercises).forEach((exerciseName) => {
      if (exercises?.[exerciseName]?.value) {
        filteredExercises[exerciseName] = {
          value: String(Number(exercises[exerciseName].value)),
        };
      }
    });

    const storageStatistics = await getStorageStatistics();
    storageStatistics.push({ exercises: filteredExercises, updated: currentDate });
    setStorageStatistics(storageStatistics);

    const experience = calculateExperience(filteredExercises);
    const weekStatistics = storageStatistics.slice(-7);

    dispatch(putUser(experience));
    dispatch(postStatus(filteredExercises));

    return { updated: currentDate, weekStatistics };
  } catch (err) {
    console.error(err);

    return rejectWithValue({ type: "error", message: "fail to update exercise" });
  }
});

export const exerciseExtraReducers = (builder: ActionReducerMapBuilder<IExerciseState>) => {
  builder
    .addCase(getExercises.pending, (state) => {
      state.isLoad = true;
      state.isFetch = true;
    })
    .addCase(getExercises.fulfilled, (state, action) => {
      const { exercises, exerciseNames, lastUpdated, weekStatistics } = action.payload;

      if (LIMIT_FREQUENT_UPDATE && lastUpdated) {
        state.nextUpdate = calculateNextUpdateHour(lastUpdated);
      }

      state.exercises = exercises;
      state.exerciseNames = exerciseNames;
      state.lastUpdated = lastUpdated;
      state.weekStatistics = weekStatistics;
      state.isLoad = false;
    })
    .addCase(getExercises.rejected, (_, action) => {
      if (action?.payload) {
        const { type, title, message } = action.payload;

        Toast.show({ type, text1: title || "Error", text2: message });
      }
    })
    .addCase(postExercies.fulfilled, (state, action) => {
      const { updated, weekStatistics } = action.payload;

      if (LIMIT_FREQUENT_UPDATE) {
        state.nextUpdate = calculateNextUpdateHour(updated);
      }

      state.lastUpdated = updated;
      state.updateStatus = [];
      state.weekStatistics = weekStatistics;
      state.enableUpdate = false;
      state.isUpdate = true;
    })
    .addCase(postExercies.rejected, (_, action) => {
      if (action?.payload) {
        const { type, title, message } = action.payload;

        Toast.show({ type, text1: title || "Error", text2: message });
      }
    });
};
