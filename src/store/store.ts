import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { employeeDetailApi } from "../features/employee-detail/data/employeeDetailApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [employeeDetailApi.reducerPath]: employeeDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(employeeDetailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
