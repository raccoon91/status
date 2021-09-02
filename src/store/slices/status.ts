import { createSlice } from "@reduxjs/toolkit";
import { statusExtraReducers } from "@src/store/thunk";
import { STATUS_INFO } from "@src/configs";

const initialStatusState: IStatusState = {
  isFetch: false,
  isLoad: false,
  status: [],
  statusInfo: STATUS_INFO,
};

export const statusSlice = createSlice({
  name: "statusSlice",
  initialState: initialStatusState,
  reducers: {},
  extraReducers: statusExtraReducers,
});

export default statusSlice.reducer;
