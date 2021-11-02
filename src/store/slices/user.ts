import { createSlice } from "@reduxjs/toolkit";
import { userExtraReducers } from "@src/store/thunk";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserState: IUserState = {
  isFetch: false,
  isLoad: false,
  name: "",
  newName: "",
  level: 1,
  experience: 0,
  requiredExperience: 1000,
  totalExperience: 0,
  experienceProgress: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
  reducers: {
    changeUserName: (state, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload;

      state.newName = value;
    },
  },
  extraReducers: userExtraReducers,
});

export const { changeUserName } = userSlice.actions;

export default userSlice.reducer;
