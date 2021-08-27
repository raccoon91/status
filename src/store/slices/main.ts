import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER, STATUS_INFO } from "@src/configs";
import type { IRootState } from "./index";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IMainState {
  isFetch: boolean;
  isLoad: boolean;
  name: string;
  newName: string;
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
  newName: "",
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

export const postUser = createAsyncThunk<typeof USER, string>("main/postUser", async (newName: string) => {
  const storageUser = await AsyncStorage.getItem("@user");
  const user: typeof USER = storageUser ? JSON.parse(storageUser) : USER;

  user.name = newName;

  AsyncStorage.setItem("@user", JSON.stringify(user));

  return user;
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
  reducers: {
    changeUserName: (state, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload;

      state.newName = value;
    },
  },
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
      .addCase(postUser.fulfilled, (state, action) => {
        const { name } = action.payload;

        state.name = name;
        state.newName = "";
      })
      .addCase(postStatus.fulfilled, (state, action) => {
        const newStatus = action.payload;

        if (newStatus) {
          state.status = newStatus;
        }
      });
  },
});

export const { changeUserName } = mainSlice.actions;

export default mainSlice.reducer;
