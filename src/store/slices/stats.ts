import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStatsState {
  fetching: boolean;
  loading: boolean;
  stats: { status: { name: string; value: number }[]; updated: string }[];
}

const initialStatsState: IStatsState = {
  fetching: false,
  loading: false,
  stats: [],
};

export const getStats = createAsyncThunk<{ status: { name: string; value: number }[]; updated: string }[]>(
  "stats/getStats",
  async () => {
    const storageStats = await AsyncStorage.getItem("@stats");

    if (storageStats != null) {
      return JSON.parse(storageStats);
    }

    return [];
  },
);

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
        state.stats = action.payload;
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
