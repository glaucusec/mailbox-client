import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
  idToken: "",
  localId: "",
  email: "",
  currPage: "compose",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    updateAuth(state, action) {
      state.idToken = action.payload.idToken;
      state.email = action.payload.email;
    },
    remoteAuth(state) {
      state.idToken = "";
      state.localId = "";
      state.email = "";
      localStorage.removeItem("idToken");
    },
    updateUserId(state, action) {
      state.localId = action.payload;
    },
    updatePage(state, action) {
      state.currPage = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
