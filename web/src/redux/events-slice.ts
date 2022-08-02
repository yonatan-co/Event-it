import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    fetchEvents(state: any, { payload }: any) {
      // state = { ...state, ...action.payload };
      // console.log(state);
      return payload;
    },
    default(state: any) {
      return state;
    },
  },
});

export const EventsActions = eventsSlice.actions;
export default eventsSlice;
