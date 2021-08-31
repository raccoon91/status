import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { USER } from "@src/configs";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IRootState, IRejectValue } from "./index";

export interface IUserState {
  isFetch: boolean;
  isLoad: boolean;
  name: string;
  newName: string;
  level: number;
  experience: number;
  requiredExperience: number;
}

const initialUserState: IUserState = {
  isFetch: false,
  isLoad: false,
  name: "",
  newName: "",
  level: 1,
  experience: 0,
  requiredExperience: 0,
};

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

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
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
  },
});

export const { changeUserName } = userSlice.actions;

export default userSlice.reducer;
