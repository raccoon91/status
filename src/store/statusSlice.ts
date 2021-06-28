import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialStatusList, exerciseData, mapStatusWithExercise } from "@src/config";

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
  exerciseList: exerciseData,
  saveStatus: false,
  statusInfoList: initialStatusList.map((status) => ({
    title: status.title,
    contents: mapStatusWithExercise[status.title],
  })),
};

export const getStatusList = createAsyncThunk<IStatus[]>("status/getStatusList", async () => {
  const storageStatusList = await AsyncStorage.getItem("@status");

  if (storageStatusList != null) {
    return JSON.parse(storageStatusList);
  } else {
    AsyncStorage.setItem("@status", JSON.stringify(initialStatusList));
    return initialStatusList;
  }
});

export const getUpdateList = createAsyncThunk<{ updateList: { [key: string]: IUpdate }; exerciseList: string[] }>(
  "status/getUpdateList",
  async () => {
    const storageUpdateList = await AsyncStorage.getItem("@update");

    if (storageUpdateList != null) {
      const updateList = JSON.parse(storageUpdateList);

      return { updateList, exerciseList: exerciseData.filter((exercise) => !updateList[exercise]) };
    } else {
      return { updateList: {}, exerciseList: [] };
    }
  },
);

export const postUpdateList = createAsyncThunk("status/postUpdateList", async (_, { getState }) => {
  const state = getState() as { status: IState };
  const { updateList } = state.status;

  const savedUpdatedList: { [key: string]: IUpdate } = {};

  Object.values(updateList).forEach((update) => {
    savedUpdatedList[update.name] = { name: update.name, value: "" };
  });

  AsyncStorage.setItem("@update", JSON.stringify(savedUpdatedList));
});

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    selectExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      state.updateList[name] = { name, value: "" };
      state.exerciseList = exerciseData.filter((exercise) => !state.updateList[exercise]);
    },
    removeExercise: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      delete state.updateList[name];
      state.exerciseList = exerciseData.filter((exercise) => !state.updateList[exercise]);
    },
    updateExercise: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;

      if (state.updateList?.[name]) {
        state.updateList[name].value = value;
      }

      if (Object.values(state.updateList).some((update) => update.value)) {
        state.saveStatus = true;
      } else {
        state.saveStatus = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatusList.pending, (state) => {
      state.loading = true;
      state.fetching = true;
    });
    builder.addCase(getStatusList.fulfilled, (state, action) => {
      state.statusList = action.payload;
      state.loading = false;
    });
    builder.addCase(getUpdateList.pending, (state) => {
      state.loading = true;
      state.fetching = true;
    });
    builder.addCase(getUpdateList.fulfilled, (state, action) => {
      const { updateList, exerciseList } = action.payload;

      state.updateList = updateList;
      state.exerciseList = exerciseList;
      state.loading = false;
    });
  },
});

export const { selectExercise, removeExercise, updateExercise } = statusSlice.actions;

export default statusSlice.reducer;
