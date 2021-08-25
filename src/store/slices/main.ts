import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER, STATUS_INFO } from "@src/configs";
import type { IRootState } from "./index";

export interface IMainState {
  isFetch: boolean;
  isLoad: boolean;
  name: string;
  level: number;
  experience: number;
  requiredExperience: number;
  status: IStatus[];
  statusInfo: IStatusInfo[];
}

const initialMainState: IMainState = {
  isFetch: false,
  isLoad: false,
  name: "",
  level: 1,
  experience: 0,
  requiredExperience: 0,
  status: [],
  statusInfo: STATUS_INFO,
};

export const getUser = createAsyncThunk<typeof USER>("main/getUser", async () => {
  const storageUser = await AsyncStorage.getItem("@user");

  if (storageUser != null) {
    return JSON.parse(storageUser);
  } else {
    AsyncStorage.setItem("@user", JSON.stringify(USER));
    return USER;
  }
});

export const postStatus = createAsyncThunk("main/postStatus", async (newStatus: IStatus[], { getState }) => {
  if (newStatus && newStatus.length > 0) {
    const state = getState() as IRootState;
    const { name, level, experience, requiredExperience } = state.main;

    AsyncStorage.setItem(
      "@user",
      JSON.stringify({
        name,
        level,
        experience,
        requiredExperience,
        status: newStatus,
      }),
    );

    return newStatus;
  }
});

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: initialMainState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoad = true;
        state.isFetch = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { name, level, experience, requiredExperience, status } = action.payload;

        state.isLoad = false;
        state.name = name;
        state.level = level;
        state.experience = experience;
        state.requiredExperience = requiredExperience;
        state.status = status;
      })
      .addCase(postStatus.fulfilled, (state, action) => {
        const newStatus = action.payload;

        if (newStatus) {
          state.status = newStatus;
        }
      });
  },
});

export default mainSlice.reducer;
