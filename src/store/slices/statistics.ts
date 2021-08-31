import { createSlice } from "@reduxjs/toolkit";
import { statisticsExtraReducers } from "src/store/thunk";

const initialStatisticsState: IStatisticsState = {
  isFetch: false,
  isLoad: false,
  statisticsData: null,
};

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState: initialStatisticsState,
  reducers: {},
  extraReducers: statisticsExtraReducers,
});

export default statisticsSlice.reducer;
