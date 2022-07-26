import { configureStore } from "@reduxjs/toolkit";
import { ILoginAction } from "../types/redux";

import isAuthSlice from "./auth-slice";
import eventsSlice from "./events-slice";
import detailsSlice from "./details-slice";

import { AuthActions } from "./auth-slice";

const authMiddleware =
  (store: any) => (next: any) => (action: ILoginAction) => {
    if (AuthActions.login.match(action)) {
      // Note: localStorage expects a string
      // localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("token", action.payload);
    } else if (AuthActions.logout.match(action)) {
      localStorage.setItem("isAuth", "false");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    return next(action);
  };

const store = configureStore({
  reducer: {
    isAuth: isAuthSlice.reducer,
    events: eventsSlice.reducer,
    details: detailsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
