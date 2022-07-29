import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuth: false };

const isAuthSlice = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    login(state: any) {
      state.isAuth = true;
      console.log(state.isAuth);
    },
    logout(state: any) {
      state.isAuth = false;
    },
  },
});

export const AuthActions = isAuthSlice.actions;
export default isAuthSlice;
