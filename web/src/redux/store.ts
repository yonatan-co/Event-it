import { configureStore } from "@reduxjs/toolkit";
import isAuthSlice from "./isAuth";

const store = configureStore({
  reducer: {
    isAuth: isAuthSlice.reducer,
  },
});

export default store;
