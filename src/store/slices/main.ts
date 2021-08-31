import { createSlice } from "@reduxjs/toolkit";
import { mainExtraReducers } from "src/store/thunk";
import { STATUS_INFO } from "@src/configs";

const initialMainState: IMainState = {
  isFetch: false,
  isLoad: false,
  status: [],
  statusInfo: STATUS_INFO,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: initialMainState,
  reducers: {},
  extraReducers: mainExtraReducers,
});

export default mainSlice.reducer;
