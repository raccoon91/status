import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { USER } from "@src/configs";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk<typeof USER, void, IRejectValue>(
  "main/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const storageUser = await AsyncStorage.getItem("@user");

      if (storageUser != null) {
        return JSON.parse(storageUser);
      } else {
        AsyncStorage.setItem("@user", JSON.stringify(USER));
        return USER;
      }
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to load user" });
    }
  },
);

export const postUser = createAsyncThunk<typeof USER, void, IRejectValue>(
  "main/postUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const storageUser = await AsyncStorage.getItem("@user");
      const user: typeof USER = storageUser ? JSON.parse(storageUser) : USER;
      const state = getState() as IRootState;
      const { newName } = state.user;

      if (newName.length === 0 || newName.length > 10) {
        return rejectWithValue({ type: "info", message: "user name should be 1 ~ 10 character" });
      }

      user.name = newName;

      AsyncStorage.setItem("@user", JSON.stringify(user));

      return user;
    } catch (err) {
      console.error(err);

      return rejectWithValue({ type: "error", message: "fail to update user" });
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
      const { name, level, experience, requiredExperience } = action.payload;

      state.isLoad = false;
      state.name = name;
      state.level = level;
      state.experience = experience;
      state.requiredExperience = requiredExperience;
    })
    .addCase(getUser.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
    })
    .addCase(postUser.fulfilled, (state, action) => {
      const { name } = action.payload;

      state.name = name;
      state.newName = "";
    })
    .addCase(postUser.rejected, (_, action) => {
      if (action?.payload) {
        const { type, message } = action.payload;

        Toast.show({ type, text1: "Error", text2: message });
      }
    });
};
