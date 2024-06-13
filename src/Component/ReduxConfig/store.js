import { configureStore } from "@reduxjs/toolkit";
import tuReducer from "./tuReducer";

export default configureStore({
  reducer: {
    tuReducer: tuReducer,
  },
})