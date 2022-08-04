import { createSlice } from "@reduxjs/toolkit";

// import { EventState } from "../types/states";

const detailsSlice = createSlice({
  name: "events",
  initialState: null,
  reducers: {
    setDetails(state: any, { payload }: any) {
      return payload;
    },
    default(state: any) {
      return state;
    },
  },
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice;
