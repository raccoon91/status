import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialStatusList, mapStatusWithExercise, exercises } from "@src/config";

interface IState {
  fetching: boolean;
  loading: boolean;
  statusList: IStatus[];
  updateList: { [key: string]: IUpdate };
  saveStatus: boolean;
  statusInfoList: IStatusInfo[];
}

const initialState: IState = {
  fetching: false,
  loading: false,
  statusList: [],
  updateList: {},
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

export const fetchUpdate = createAsyncThunk("status/fetchUpdate", async (_, { getState }) => {
  const state = getState() as { status: IState };
  const { statusList, updateList } = state.status;

  const newSatusList = statusList.map((status) => {
    const { title, value } = status;
    const update = updateList[title];

    if (update) {
      const rate = exercises[update.exercise].rate;
      const updatePoint = Number(update.value) * rate;

      return {
        title,
        value: value + updatePoint,
      };
    } else {
      return status;
    }
  });

  await AsyncStorage.setItem("@status", JSON.stringify(newSatusList));

  return newSatusList;
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
    builder.addCase(fetchUpdate.pending, (state) => {
      state.loading = true;
      state.fetching = true;
    });
    builder.addCase(fetchUpdate.fulfilled, (state, action) => {
      state.statusList = action.payload;
      state.loading = false;
    });
  },
});

export const { updateStatus, updateExercise } = statusSlice.actions;

export default statusSlice.reducer;
