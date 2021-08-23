import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { STATUS_COLORS } from "@src/configs";

interface IStat {
  status: { name: string; value: number }[];
  updated: string;
}

interface IChartData {
  label: string;
  data: number[];
  backgroundColor: string;
  barThickness?: number;
  borderRadius?: number;
}
export interface IStatsState {
  fetching: boolean;
  loading: boolean;
  statsData: {
    labels: string[];
    datasets: IChartData[];
  } | null;
}

const initialStatsState: IStatsState = {
  fetching: false,
  loading: false,
  statsData: null,
};

export const getStats = createAsyncThunk<IStat[]>("stats/getStats", async () => {
  const storageStats = await AsyncStorage.getItem("@stats");

  if (storageStats != null) {
    return JSON.parse(storageStats);
  }

  return null;
});

export const postStats = createAsyncThunk<IStat[], IStat>("stats/postStats", async ({ status, updated }) => {
  const storageStats = await AsyncStorage.getItem("@stats");
  const newStats = storageStats ? JSON.parse(storageStats) : [];

  const newStat = { status, updated };
  newStats.push(newStat);

  AsyncStorage.setItem("@stats", JSON.stringify(newStats));

  return newStats;
});

const setStatsData = (state: IStatsState, stats: IStat[]) => {
  if (stats) {
    const labels: string[] = [];
    const statData: { [key: string]: IChartData } = {};

    stats.forEach((stat) => {
      labels.push(dayjs(stat.updated).format("MM-DD"));

      stat.status.forEach((item) => {
        if (!statData[item.name]) {
          statData[item.name] = {
            label: item.name,
            data: [],
            backgroundColor: STATUS_COLORS[item.name],
            borderRadius: 10,
            barThickness: 6,
          };
        }

        if (item.value) {
          statData[item.name].data.push(item.value);
        } else {
          statData[item.name].data.push(0);
        }
      });
    });

    state.statsData = {
      labels,
      datasets: Object.values(statData),
    };
  }
};

export const statsSlice = createSlice({
  name: "statsSlice",
  initialState: initialStatsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.fetching = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        const storageStats = action.payload;

        setStatsData(state, storageStats);

        state.loading = false;
      })
      .addCase(postStats.fulfilled, (state, action) => {
        const newStats = action.payload;

        setStatsData(state, newStats);
      });
  },
});

export default statsSlice.reducer;
