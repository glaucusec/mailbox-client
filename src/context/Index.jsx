import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import mailReducer from "./Mails";

const store = configureStore({
  reducer: { auth: authReducer, mails: mailReducer },
});

export default store;
