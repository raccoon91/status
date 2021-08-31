import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { STATUS_COLORS } from "@src/configs";
import { IRejectValue } from "./index";

interface IChartData {
  label: string;
  data: number[];
  backgroundColor: string;
  barThickness?: number;
  borderRadius?: number;
}
export interface IStatisticsState {
  isFetch: boolean;
  isLoad: boolean;
  statisticsData: {
    labels: string[];
    datasets: IChartData[];
  } | null;
}

const initialStatisticsState: IStatisticsState = {
  isFetch: false,
  isLoad: false,
  statisticsData: null,
};

export const getStatistics = createAsyncThunk<IStatistics[], void, IRejectValue>(
  "statistics/getStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const storageStatistics = await AsyncStorage.getItem("@statistics");

      if (storageStatistics != null) {
        const parsedStatistics = JSON.parse(storageStatistics);

        return parsedStatistics.slice(-7);
      }

      return null;
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to get statistics" });
    }
  },
);

export const postStatistics = createAsyncThunk<IStatistics[], IStatistics, IRejectValue>(
  "statistics/postStatistics",
  async ({ status, updated }, { rejectWithValue }) => {
    try {
      const storageStatistics = await AsyncStorage.getItem("@statistics");
      const newStatistics = storageStatistics ? JSON.parse(storageStatistics) : [];

      const statisticsData = { status, updated };
      newStatistics.push(statisticsData);

      AsyncStorage.setItem("@statistics", JSON.stringify(newStatistics));

      return newStatistics.slice(-7);
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update statistics" });
    }
  },
);

const setStatisticsData = (state: IStatisticsState, statisticsData: IStatistics[]) => {
  if (statisticsData) {
    const labels: string[] = [];
    const newStatisticsData: { [key: string]: IChartData } = {};

    statisticsData.forEach((statistics) => {
      labels.push(dayjs(statistics.updated).format("MM-DD"));

      statistics.status.forEach((item) => {
        if (!newStatisticsData[item.name]) {
          newStatisticsData[item.name] = {
            label: item.name,
            data: [],
            backgroundColor: STATUS_COLORS[item.name],
            // borderRadius: 4,
            barThickness: 10,
          };
        }

        if (item.value) {
          newStatisticsData[item.name].data.push(item.value / 1000);
        } else {
          newStatisticsData[item.name].data.push(0);
        }
      });
    });

    state.statisticsData = {
      labels,
      datasets: Object.values(newStatisticsData),
    };
  }
};

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState: initialStatisticsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoad = true;
        state.isFetch = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        const storageStatistics = action.payload;

        setStatisticsData(state, storageStatistics);

        state.isLoad = false;
      })
      .addCase(getStatistics.rejected, (_, action) => {
        if (action?.payload) {
          const { type, message } = action.payload;

          Toast.show({ type, text1: "Error", text2: message });
        }
      })
      .addCase(postStatistics.fulfilled, (state, action) => {
        const newStatistics = action.payload;

        setStatisticsData(state, newStatistics);
      })
      .addCase(postStatistics.rejected, (_, action) => {
        if (action?.payload) {
          const { type, message } = action.payload;

          Toast.show({ type, text1: "Error", text2: message });
        }
      });
  },
});

export default statisticsSlice.reducer;
