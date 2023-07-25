import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './reducers/User-slice';
import userReducer from "./Reducers/user-slice";

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
