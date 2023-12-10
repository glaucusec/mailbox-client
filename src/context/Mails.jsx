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
    deleteMail(state, action) {
      const key = action.payload;
      const updatedInbox = { ...state.inbox };

      const newInbox = Object.keys(updatedInbox).reduce((acc, k) => {
        if (k !== key) {
          acc[k] = updatedInbox[k];
        }
        return acc;
      }, {});

      state.inbox = newInbox;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
