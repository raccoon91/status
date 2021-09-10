import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { storage, calculateExperience, calculateStatistics } from "@src/utils";
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
    const storageStatistics = await storage.getItemOrNull<IStatistics[]>("@statistics");

    if (storageStatistics) {
      const exercises: IExercises = {};
      const lastStatistics = storageStatistics.slice(-1)[0];
      const weekStatistics = storageStatistics.slice(-7);

      Object.keys(lastStatistics.exercises).forEach((exerciseName: string) => {
        exercises[exerciseName] = {
          ...lastStatistics.exercises,
          value: "",
        };
      });

      return {
        lastUpdated: lastStatistics.updated,
        exercises,
        exerciseNames: Object.keys(lastStatistics.exercises),
        weekStatistics,
      };
    } else {
      return { lastUpdated: "", exercises: {}, exerciseNames: [], statisticsData: [], weekStatistics: [] };
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
    const currentDate = dayjs().format("YYYY-MM-DD HH:mm");

    if (lastUpdated && !dayjs(lastUpdated).isBefore(dayjs(currentDate), "day")) {
      return rejectWithValue({ type: "info", message: "you can update status tomorrow" });
    }

    if (lastUpdated && !dayjs(lastUpdated).isBefore(dayjs(currentDate).subtract(6, "hour"), "hour")) {
      return rejectWithValue({ type: "info", message: "you can update status after six hour" });
    }

    const storageStatistics = await storage.getItem<IStatistics[]>("@statistics", []);

    storageStatistics.push({ exercises, updated: currentDate });

    const experience = calculateExperience(exercises);
    const weekStatistics = storageStatistics.slice(-7);

    storage.setItem("@statistics", storageStatistics);

    dispatch(putUser(experience));
    dispatch(postStatus(exercises));

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
      const { labels, datasets } = calculateStatistics(weekStatistics);

      state.exercises = exercises;
      state.exerciseNames = exerciseNames;
      state.lastUpdated = lastUpdated;
      state.chartLabels = labels;
      state.chartDatasets = datasets;
      state.weekStatistics = weekStatistics;
      state.isLoad = false;
    })
    .addCase(getExercises.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
    })
    .addCase(postExercies.fulfilled, (state, action) => {
      const { updated, weekStatistics } = action.payload;
      const { labels, datasets } = calculateStatistics(weekStatistics);

      state.lastUpdated = updated;
      state.updateStatus = [];
      state.chartLabels = labels;
      state.chartDatasets = datasets;
      state.weekStatistics = weekStatistics;
      state.isUpdate = true;
    })
    .addCase(postExercies.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
    });
};
