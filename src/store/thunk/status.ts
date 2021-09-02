import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { STATUS } from "@src/configs";
import { exerciseToStatus } from "@src/utils";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getStatus = createAsyncThunk<typeof STATUS, void, IRejectValue>(
  "status/getStatus",
  async (_, { rejectWithValue }) => {
    try {
      const storageStatus = await AsyncStorage.getItem("@status");

      if (storageStatus != null) {
        return JSON.parse(storageStatus);
      } else {
        AsyncStorage.setItem("@status", JSON.stringify(STATUS));

        return STATUS;
      }
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to get status" });
    }
  },
);

export const postStatus = createAsyncThunk<IStatus[], IExercises, IRejectValue>(
  "status/postStatus",
  async (newExercises, { rejectWithValue }) => {
    try {
      const storageStatus = await AsyncStorage.getItem("@status");
      const parsedStatus: IStatus[] = storageStatus ? JSON.parse(storageStatus) : STATUS;
      const updateStatus = exerciseToStatus(newExercises);

      const newStatus = parsedStatus.map((status, index) => ({
        name: status.name,
        value: status.value + (updateStatus?.[index]?.value || 0),
      }));

      AsyncStorage.setItem("@status", JSON.stringify(newStatus));

      return newStatus;
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update status" });
    }
  },
);

export const statusExtraReducers = (builder: ActionReducerMapBuilder<IStatusState>) => {
  builder
    .addCase(getStatus.pending, (state) => {
      state.isLoad = true;
      state.isFetch = true;
    })
    .addCase(getStatus.fulfilled, (state, action) => {
      const status = action.payload;

      state.status = status;
      state.isLoad = false;
    })
    .addCase(getStatus.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
    })
    .addCase(postStatus.fulfilled, (state, action) => {
      const newStatus = action.payload;

      state.status = newStatus;
    })
    .addCase(postStatus.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
    });
};
