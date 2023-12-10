import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
  inbox: {},
  sentbox: {},
  soloMail: {},
};

const mailSlice = createSlice({
  name: "mails",
  initialState: initialAuth,
  reducers: {
    setInbox(state, action) {
      state.inbox = action.payload;
    },
    setSentBox(state, action) {
      state.sentbox = action.payload;
    },
    setSoloMail(state, action) {
      state.soloMail = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
