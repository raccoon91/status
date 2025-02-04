import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { USER } from "@src/configs";
import { getStorageUser, setStorageUser, calculateUserLevel } from "@src/utils";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk<typeof USER, void, IRejectValue>(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const storageUser = await getStorageUser();

      return storageUser;
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to load user" });
    }
  },
);

export const postUser = createAsyncThunk<typeof USER, void, IRejectValue>(
  "user/postUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const storageUser = await getStorageUser();
      const state = getState() as IRootState;
      const { newName } = state.user;

      if (newName.length === 0 || newName.length > 10) {
        return rejectWithValue({ type: "info", title: "Info", message: "user name should be 1 ~ 10 character" });
      }

      storageUser.name = newName;

      setStorageUser(storageUser);

      return storageUser;
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update user" });
    }
  },
);

export const putUser = createAsyncThunk<typeof USER, number, IRejectValue>(
  "user/putUser",
  async (updateExperience, { getState, rejectWithValue }) => {
    try {
      const state = getState() as IRootState;
      const { level, experience, requiredExperience, totalExperience } = state.user;

      const { newLevel, newExperience, newRequiredExperience } = calculateUserLevel(
        level,
        experience + updateExperience,
        requiredExperience,
      );

      const storageUser = await getStorageUser();

      storageUser.level = newLevel;
      storageUser.experience = newExperience;
      storageUser.requiredExperience = newRequiredExperience;
      storageUser.totalExperience = totalExperience + updateExperience;

      setStorageUser(storageUser);

      return storageUser;
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update user experience" });
    }
  },
);

export const userExtraReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
  builder
    .addCase(getUser.pending, (state) => {
      state.isLoad = true;
      state.isFetch = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      const { name, level, experience, requiredExperience, totalExperience, version } = action.payload;

      state.name = name;
      state.level = level;
      state.experience = experience;
      state.requiredExperience = requiredExperience;
      state.totalExperience = totalExperience;
      state.version = version;
      state.isLoad = false;
    })
    .addCase(getUser.rejected, (_, action) => {
      if (action?.payload) {
        const { type, title, message } = action.payload;

        Toast.show({ type, text1: title || "Error", text2: message });
      }
    })
    .addCase(postUser.fulfilled, (state, action) => {
      const { name } = action.payload;

      state.name = name;
      state.newName = "";
    })
    .addCase(postUser.rejected, (_, action) => {
      if (action?.payload) {
        const { type, title, message } = action.payload;

        Toast.show({ type, text1: title || "Error", text2: message });
      }
    })
    .addCase(putUser.fulfilled, (state, action) => {
      const { level, experience, requiredExperience, totalExperience } = action.payload;

      state.level = level;
      state.experience = experience;
      state.requiredExperience = requiredExperience;
      state.totalExperience = totalExperience;
    })
    .addCase(putUser.rejected, (_, action) => {
      if (action?.payload) {
        const { type, title, message } = action.payload;

        Toast.show({ type, text1: title || "Error", text2: message });
      }
    });
};
