import { legacy_createStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
