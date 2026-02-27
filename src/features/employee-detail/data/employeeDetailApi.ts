import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { EmployeeDetail, Department } from "../domain/employee-detail.types";

export const employeeDetailApi = createApi({
  reducerPath: "employeeDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["EmployeeDetail"],
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeDetail[], void>({
      query: () => "/employees",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "EmployeeDetail" as const, id })),
              { type: "EmployeeDetail" as const, id: "LIST" },
            ]
          : [{ type: "EmployeeDetail" as const, id: "LIST" }],
    }),
    getEmployeeById: builder.query<EmployeeDetail, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (_result, _error, id) => [{ type: "EmployeeDetail", id }],
    }),
    createEmployee: builder.mutation<EmployeeDetail, Omit<EmployeeDetail, "id">>({
      query: (employee) => ({
        url: "/employees",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: [{ type: "EmployeeDetail", id: "LIST" }],
    }),
    updateEmployee: builder.mutation<EmployeeDetail, EmployeeDetail>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
      invalidatesTags: (_result, _error, employee) => [
        { type: "EmployeeDetail", id: employee.id },
        { type: "EmployeeDetail", id: "LIST" },
      ],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "EmployeeDetail", id },
        { type: "EmployeeDetail", id: "LIST" },
      ],
    }),
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetDepartmentsQuery,
} = employeeDetailApi;
