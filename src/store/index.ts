import { configureStore } from "@reduxjs/toolkit";
import statusSlice from "./statusSlice";

export const store = configureStore({
  reducer: {
    status: statusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
