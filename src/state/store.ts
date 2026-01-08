import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@state/user/user";
import commonReducer from "./common/common";

export const store = configureStore({
  reducer: {
    user: userReducer,
    common:commonReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;