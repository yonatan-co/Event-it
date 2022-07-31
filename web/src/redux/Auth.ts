import { createSlice } from "@reduxjs/toolkit";
import { ILoginAction } from "../types/redux";

const initialState = { isAuth: false, token: null };

const isAuthSlice = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    login(state: any, action: any) {
      state.isAuth = true;
      state.userId = action.payload;
      console.log(state.userId);
    },
    logout(state: any) {
      state.isAuth = false;
    },
  },
});

export const AuthActions = isAuthSlice.actions;
export default isAuthSlice;
