import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import layersReducer from "./Reducers/layersReducer";
const reducers = combineReducers({
  layersReducer: layersReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['layersReducer']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true
})
