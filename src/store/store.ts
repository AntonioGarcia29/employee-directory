import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "../features/employees/data/employeesApi";
import { employeeDetailApi } from "../features/employee-detail/data/employeeDetailApi";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [employeeDetailApi.reducerPath]: employeeDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeesApi.middleware)
      .concat(employeeDetailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
