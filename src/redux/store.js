import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./userSlice";

const rootReducer = combineReducers({
  userData: userReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,  // version added for migration / fast refresh stability
  debug: true, // optional: log persist actions in console
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
