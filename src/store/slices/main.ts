import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { STATUS, STATUS_INFO } from "@src/configs";
import { IRejectValue } from "./index";

export interface IMainState {
  isFetch: boolean;
  isLoad: boolean;
  status: IStatus[];
  statusInfo: IStatusInfo[];
}

const initialMainState: IMainState = {
  isFetch: false,
  isLoad: false,
  status: [],
  statusInfo: STATUS_INFO,
};

export const getStatus = createAsyncThunk<typeof STATUS, void, IRejectValue>(
  "main/getStatus",
  async (_, { rejectWithValue }) => {
    try {
      const storageUser = await AsyncStorage.getItem("@status");

      if (storageUser != null) {
        return JSON.parse(storageUser);
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

export const postStatus = createAsyncThunk<IStatus[] | void, IStatus[], IRejectValue>(
  "main/postStatus",
  async (newStatus: IStatus[], { rejectWithValue }) => {
    try {
      if (newStatus && newStatus.length > 0) {
        AsyncStorage.setItem("@status", JSON.stringify(newStatus));

        return newStatus;
      }
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update status" });
    }
  },
);

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: initialMainState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.isLoad = true;
        state.isFetch = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        const status = action.payload;

        state.isLoad = false;

        if (status) {
          state.status = status;
        }
      })
      .addCase(getStatus.rejected, (_, action) => {
        if (action?.payload) {
          const { type, message } = action.payload;

          Toast.show({ type, text1: "Error", text2: message });
        }
      })
      .addCase(postStatus.fulfilled, (state, action) => {
        const newStatus = action.payload;

        if (newStatus) {
          state.status = newStatus;
        }
      })
      .addCase(postStatus.rejected, (_, action) => {
        if (action?.payload) {
          const { type, message } = action.payload;

          Toast.show({ type, text1: "Error", text2: message });
        }
      });
  },
});

export default mainSlice.reducer;
