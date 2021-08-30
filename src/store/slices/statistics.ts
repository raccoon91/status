import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { STATUS_COLORS } from "@src/configs";

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

export const getStatistics = createAsyncThunk<IStatistics[]>("statistics/getStatistics", async () => {
  const storageStatistics = await AsyncStorage.getItem("@statistics");

  if (storageStatistics != null) {
    const parsedStatistics = JSON.parse(storageStatistics);

    return parsedStatistics.slice(-7);
  }

  return null;
});

export const postStatistics = createAsyncThunk<IStatistics[], IStatistics>(
  "statistics/postStatistics",
  async ({ status, updated }) => {
    const storageStatistics = await AsyncStorage.getItem("@statistics");
    const newStatistics = storageStatistics ? JSON.parse(storageStatistics) : [];

    const statisticsData = { status, updated };
    newStatistics.push(statisticsData);

    AsyncStorage.setItem("@statistics", JSON.stringify(newStatistics));

    return newStatistics.slice(-7);
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
            borderRadius: 4,
            barThickness: 10,
          };
        }

        if (item.value) {
          newStatisticsData[item.name].data.push(item.value);
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
      .addCase(postStatistics.fulfilled, (state, action) => {
        const newStatistics = action.payload;

        setStatisticsData(state, newStatistics);
      });
  },
});

export default statisticsSlice.reducer;
