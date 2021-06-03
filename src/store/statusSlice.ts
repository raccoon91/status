import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialStatusList, exercises, initialUpdateList, initialStatusInfoList } from "@src/config";

interface IState {
  fetching: boolean;
  loading: boolean;
  statusList: IStatus[];
  exercises: { [key: string]: IExercise };
  updateList: IStatus[];
  statusInfoList: IStatusInfo[];
}

const initialState: IState = {
  fetching: false,
  loading: false,
  statusList: [],
  exercises,
  updateList: initialUpdateList,
  statusInfoList: initialStatusInfoList,
};

export const fetchStatus = createAsyncThunk<IStatus[]>("status/fetchStatus", async () => {
  const statusValues = await AsyncStorage.getItem("@status");

  if (statusValues != null) {
    return JSON.parse(statusValues);
  } else {
    AsyncStorage.setItem("@status", JSON.stringify(initialStatusList));
    return initialStatusList;
  }
});

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<{ name: string; value: number }>) => {
      const { name, value } = action.payload;

      console.log(name, value);

      // state.statusList.forEach((status) => {
      //   if (status.name === name) {
      //     status.value = value;
      //   }
      // });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatus.pending, (state) => {
      state.loading = true;
      state.fetching = true;
    });
    builder.addCase(fetchStatus.fulfilled, (state, action) => {
      state.statusList = action.payload;
      state.loading = false;
    });
  },
});

export const { updateStatus } = statusSlice.actions;

export default statusSlice.reducer;
