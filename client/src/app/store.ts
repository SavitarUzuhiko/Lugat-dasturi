import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/CounterSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools:true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch