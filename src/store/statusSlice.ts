import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialStatusList, exercises, mapStatusWithExercise } from "@src/config";

interface IState {
  fetching: boolean;
  loading: boolean;
  statusList: IStatus[];
  exercises: { [key: string]: IExercise };
  updateList: { [key: string]: IUpdate };
  statusInfoList: IStatusInfo[];
}

const initialState: IState = {
  fetching: false,
  loading: false,
  statusList: [],
  exercises,
  updateList: {},
  statusInfoList: initialStatusList.map((status) => ({
    title: status.title,
    contents: mapStatusWithExercise[status.title],
  })),
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
    updateStatus: (state, action: PayloadAction<{ title: string; exercise: string }>) => {
      const { title, exercise } = action.payload;

      if (state.updateList?.[title]?.exercise === exercise) {
        delete state.updateList[title];
      } else {
        state.updateList[title] = { title, exercise, value: "" };
      }
    },
    updateExercise: (state, action: PayloadAction<{ title: string; value: string }>) => {
      const { title, value } = action.payload;

      if (state.updateList?.[title]) {
        state.updateList[title].value = value;
      }
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

export const { updateStatus, updateExercise } = statusSlice.actions;

export default statusSlice.reducer;
