import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    fetchEvents(state: any, { payload }: any) {
      return payload;
    },
    deleteEvent(state: any, { payload }: any) {
      return state.filter((item: any) => item._id === payload);
    },
    default(state: any) {
      return state;
    },
  },
});

export const EventsActions = eventsSlice.actions;
export default eventsSlice;
