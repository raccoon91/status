import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { postStatus } from "./main";
import { postStatistics } from "./statistics";
import { STATUS_INDEX, EXERCISES, EXERCISE_NAMES } from "@src/configs";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getExercises = createAsyncThunk<
  {
    exercises: { [key: string]: IExercise };
    exerciseNames: string[];
    updated: string;
  },
  void,
  IRejectValue
>("exercise/getExercises", async (_, { rejectWithValue }) => {
  try {
    const storageExercises = await AsyncStorage.getItem("@exercise");

    if (storageExercises !== null) {
      const { exercises, updated } = JSON.parse(storageExercises);

      return { exercises, exerciseNames: EXERCISE_NAMES.filter((exerciseName) => !exercises[exerciseName]), updated };
    } else {
      return { exercises: {}, exerciseNames: EXERCISE_NAMES, updated: "" };
    }
  } catch (err) {
    console.error(err);

    return rejectWithValue({ type: "error", message: "fail to get exercise" });
  }
});

export const postExercies = createAsyncThunk<{ updated: string }, void, IRejectValue>(
  "exercise/postExercies",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
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
        if (exercises?.[exerciseName]?.value) {
          storageExercises[exerciseName] = { value: "", unit: EXERCISES?.[exerciseName]?.unit || "" };
        }
      });

      await AsyncStorage.setItem("@exercise", JSON.stringify({ exercises: storageExercises, updated }));

      const newStatus: IStatus[] = [];
      const newUpdateStatus: IStatus[] = [];

      status.forEach((stat) => {
        const updateValue = updateStatus?.[STATUS_INDEX[stat.name]]?.value || 0;

        newStatus.push({
          name: stat.name,
          value: stat.value + updateValue,
        });

        newUpdateStatus.push({
          name: stat.name,
          value: updateValue,
        });
      });

      dispatch(postStatistics({ status: newUpdateStatus, updated }));
      dispatch(postStatus(newStatus));

      return { updated };
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update exercise" });
    }
  },
);

export const exerciseExtraReducers = (builder: ActionReducerMapBuilder<IExerciseState>) => {
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
    .addCase(getExercises.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
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

        Toast.show({ type, text1: "Error", text2: message });
      }
    });
};
