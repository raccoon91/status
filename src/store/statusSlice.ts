import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialStatusList, exerciseList, mapStatusWithExercise } from "@src/config";

interface IState {
  fetching: boolean;
  loading: boolean;
  statusList: IStatus[];
  updateList: { [key: string]: IUpdate };
  saveStatus: boolean;
  exerciseList: string[];
  statusInfoList: IStatusInfo[];
}

const initialState: IState = {
  fetching: false,
  loading: false,
  statusList: [],
  updateList: {},
  exerciseList,
  saveStatus: false,
  statusInfoList: initialStatusList.map((status) => ({
    title: status.title,
    contents: mapStatusWithExercise[status.title],
  })),
};

export const fetchStatus = createAsyncThunk<IStatus[]>("status/fetchStatus", async () => {
  const storageStatusList = await AsyncStorage.getItem("@status");

  if (storageStatusList != null) {
    return JSON.parse(storageStatusList);
  } else {
    AsyncStorage.setItem("@status", JSON.stringify(initialStatusList));
    return initialStatusList;
  }
});

// export const fetchUpdate = createAsyncThunk("status/fetchUpdate", async (_, { getState }) => {
//   const state = getState() as { status: IState };
//   const { statusList, updateList } = state.status;
// });

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    selectExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      state.updateList[name] = { name, value: "" };
      state.exerciseList = state.exerciseList.filter((exercise) => exercise !== name);
    },
    updateExercise: (state, action: PayloadAction<{ title: string; value: string }>) => {
      const { title, value } = action.payload;

      if (state.updateList?.[title]) {
        state.updateList[title].value = value;
      }

      if (Object.values(state.updateList).some((update) => update.value)) {
        state.saveStatus = true;
      } else {
        state.saveStatus = false;
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

export const { selectExercise, updateExercise } = statusSlice.actions;

export default statusSlice.reducer;
