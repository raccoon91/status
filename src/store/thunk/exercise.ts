import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { STATUS_COLORS } from "@src/configs";
import { exerciseToStatus, calculateExperience } from "@src/utils";
import { putUser } from "./user";
import { postStatus } from "./status";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

const setStatisticsData = (state: IExerciseState, statisticsData: IStatistics[]) => {
  if (statisticsData) {
    const labels: string[] = [];
    const datasets: { [key: string]: IChartData } = {};

    statisticsData.forEach((statistics) => {
      labels.push(dayjs(statistics.updated).format("MM-DD"));

      statistics.status.forEach((item) => {
        if (!datasets[item.name]) {
          datasets[item.name] = {
            label: item.name,
            data: [],
            backgroundColor: STATUS_COLORS[item.name],
            barThickness: 12,
          };
        }

        if (item.value) {
          datasets[item.name].data.push(item.value / 1000);
        } else {
          datasets[item.name].data.push(0);
        }
      });
    });

    state.chartLabels = labels;
    state.chartDatasets = Object.values(datasets);
  }
};

export const getExercises = createAsyncThunk<
  {
    lastUpdated: string;
    exercises: IExercises;
    exerciseNames: string[];
    statisticsData: IStatistics[];
    weekStatistics: { exercises: IExercises; updated: string }[];
  },
  void,
  IRejectValue
>("exercise/getExercises", async (_, { rejectWithValue }) => {
  try {
    const storageStatistics = await AsyncStorage.getItem("@statistics");

    if (storageStatistics !== null) {
      const parsedStatistics: { exercises: IExercises; updated: string }[] = JSON.parse(storageStatistics) || [];
      const exercises: IExercises = {};
      const lastStatistics = parsedStatistics.slice(-1)[0];
      const weekStatistics = parsedStatistics.slice(-7);
      const statisticsData = weekStatistics.map((data) => ({
        status: exerciseToStatus(data.exercises),
        updated: data.updated,
      }));

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
        statisticsData,
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
    statisticsData: IStatistics[];
    weekStatistics: { exercises: IExercises; updated: string }[];
  },
  void,
  IRejectValue
>("exercise/postExercies", async (_, { getState, rejectWithValue, dispatch }) => {
  try {
    const state = getState() as IRootState;
    const { exercises, lastUpdated } = state.exercise;
    const updated = dayjs().format("YYYY-MM-DD HH:mm");

    if (lastUpdated) {
      if (!dayjs(lastUpdated).isBefore(dayjs(updated), "day")) {
        return rejectWithValue({ type: "info", message: "you can update status after a day" });
      }
      if (!dayjs(lastUpdated).isBefore(dayjs(updated).subtract(6, "hour"))) {
        return rejectWithValue({ type: "info", message: "you can update status after six hour" });
      }
    }

    const storageStatistics = await AsyncStorage.getItem("@statistics");
    const parsedStatistics: { exercises: IExercises; updated: string }[] = storageStatistics
      ? JSON.parse(storageStatistics)
      : [];

    parsedStatistics.push({ exercises, updated });
    const experience = calculateExperience(exercises);
    const weekStatistics = parsedStatistics.slice(-7);
    const statisticsData = weekStatistics.map((data) => ({
      status: exerciseToStatus(data.exercises),
      updated,
    }));

    AsyncStorage.setItem("@statistics", JSON.stringify(parsedStatistics));

    dispatch(putUser(experience));
    dispatch(postStatus(exercises));

    return { updated, statisticsData, weekStatistics };
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
      const { exercises, exerciseNames, lastUpdated, statisticsData, weekStatistics } = action.payload;

      state.exercises = exercises;
      state.exerciseNames = exerciseNames;
      state.lastUpdated = lastUpdated;
      setStatisticsData(state, statisticsData);
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
      const { updated, statisticsData, weekStatistics } = action.payload;

      state.lastUpdated = updated;
      state.updateStatus = [];
      setStatisticsData(state, statisticsData);
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
