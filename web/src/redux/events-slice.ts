import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    fetchEvents(state: any, { payload }: any) {
      return payload;
    },
    default(state: any) {
      return state;
    },
  },
});

export const EventsActions = eventsSlice.actions;
export default eventsSlice;
