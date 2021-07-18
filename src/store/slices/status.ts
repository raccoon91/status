import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INITIAL_STATUS, MAP_STATUS_WITH_EXERCISE } from "@src/configs";

export interface IStatusState {
  fetching: boolean;
  loading: boolean;
  status: IStatValues[];
  statusInfo: IStatInfoValues[];
}

const initialStatusState: IStatusState = {
  fetching: false,
  loading: false,
  status: [],
  statusInfo: INITIAL_STATUS.map((status) => ({
    name: status.name,
    exercises: MAP_STATUS_WITH_EXERCISE[status.name] || [],
  })),
};

export const getStatus = createAsyncThunk<IStatValues[]>("status/getStatus", async () => {
  const storageStatus = await AsyncStorage.getItem("@status");

  if (storageStatus != null) {
    return JSON.parse(storageStatus);
  } else {
    AsyncStorage.setItem("@status", JSON.stringify(INITIAL_STATUS));
    return INITIAL_STATUS;
  }
});

export const status = createSlice({
  name: "status",
  initialState: initialStatusState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatus.pending, (state) => {
      state.loading = true;
      state.fetching = true;
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
    });
  },
});

export default status.reducer;
