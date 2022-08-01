import { configureStore } from "@reduxjs/toolkit";
import { ILoginAction } from "../types/redux";
import isAuthSlice from "./Auth";

import { AuthActions } from "./Auth";

const authMiddleware =
  (store: any) => (next: any) => (action: ILoginAction) => {
    if (AuthActions.login.match(action)) {
      // Note: localStorage expects a string
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", action.payload);
    }
    // else if (AuthActions.logout.match(action)) {
    //   localStorage.setItem("isAuthenticated", "false");
    //   localStorage.setItem("token", "");
    // }
    return next(action);
  };

const store = configureStore({
  reducer: {
    isAuth: isAuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
