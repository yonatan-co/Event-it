import { configureStore } from "@reduxjs/toolkit";
import isAuthSlice from "./Auth";

const store = configureStore({
  reducer: {
    isAuth: isAuthSlice.reducer,
  },
});

export default store;
