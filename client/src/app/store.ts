import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { uploadApi } from './api/uploadApi/uploadApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    uploadApi: uploadApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, uploadApi.middleware),
  devTools:true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch