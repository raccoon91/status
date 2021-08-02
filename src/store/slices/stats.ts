import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStatsState {
  fetching: boolean;
  loading: boolean;
  stats: { name: string; value: number }[];
  statsData: {
    labels: string[];
    legend: string[];
    data: number[][];
    barColors: string[];
  };
}

const initialStatsState: IStatsState = {
  fetching: false,
  loading: false,
  stats: [],
  statsData: {
    labels: [],
    legend: ["L1", "L2", "L3"],
    data: [],
    barColors: ["#7b7b7b", "#9d9d9d", "#c4c4c4", "#d9d9d9", "#e9e9e9", "#f5f5f5"],
  },
};

export const getStats = createAsyncThunk<{
  stats?: number[][];
  labels?: string[];
  parsedStats?: { status: { name: string; value: number }[]; updated: string };
}>("stats/getStats", async () => {
  const storageStats = await AsyncStorage.getItem("@stats");

  if (storageStats != null) {
    const parsedStats = JSON.parse(storageStats);

    const labels: string[] = [];
    const stats: number[][] = [];

    parsedStats.forEach((items: { status: { name: string; value: number }[]; updated: string }) => {
      labels.push(items.updated.split(" ")[0]);

      const data: number[] = [];

      items.status.forEach((item) => {
        data.push(item.value);
      });

      stats.push(data);
    });

    return { stats, labels, parsedStats };
  }

  return {};
});

export const postStats = createAsyncThunk(
  "stats/postStats",
  async ({ status, updated }: { status: { name: string; value: number }[]; updated: string }) => {
    const storageStats = await AsyncStorage.getItem("@stats");
    const stats = storageStats ? JSON.parse(storageStats) : [];

    const newStat = { status, updated };
    stats.push(newStat);

    AsyncStorage.setItem("@stats", JSON.stringify(stats));

    return stats;
  },
);

export const stats = createSlice({
  name: "stats",
  initialState: initialStatsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.fetching = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        const { stats: data, labels, parsedStats } = action.payload;

        if (data && labels && parsedStats) {
          state.statsData.labels = labels;
          state.statsData.data = data;
          state.stats = parsedStats.status;
        }

        state.loading = false;
      })
      .addCase(postStats.fulfilled, (state, action) => {
        const newStats = action.payload;

        if (newStats) {
          state.stats = newStats;
        }
      });
  },
});

export default stats.reducer;
