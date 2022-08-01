import { createSlice } from "@reduxjs/toolkit";

const initialState = { events: null };

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    fetchEvents(state: any, action: any) {
      state.events = action.payload;
    },
  },
});

export const EventsActions = eventsSlice.actions;
export default eventsSlice;
