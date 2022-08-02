import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuth: false, token: null };

const isAuthSlice = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    login(state: any, action: any) {
      state.token = action.payload;
    },
    logout(state: any) {
      state.isAuth = false;
    },
  },
});

export const AuthActions = isAuthSlice.actions;
export default isAuthSlice;
