import { baseApi } from "../baseApi";
import type { createDepartmentReq, deleteDepartmentReq, DepartmentRes, getDepartmentReq, getDepartmentRes, updateDepartmentReq } from "./types";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDepartment: builder.mutation<DepartmentRes, createDepartmentReq>({
      query: body => ({
        url: 'department/add',
        method:'POST',
        body
      })
    }),
    getDepartments: builder.query<getDepartmentRes, getDepartmentReq>({
      query: ({ page = 1, limit = 10, dict = ''}) => ({
        url: 'department/all',
        method: 'GET',
        params: { page, limit, dict},
      }),
    }),
    
    deleteDepartment: builder.mutation<DepartmentRes,deleteDepartmentReq>({
      query: ({id}) => ({
        url: `department/delete/${id}`,
        method:"DELETE",
      })
    }),
    updateDepartment: builder.mutation<DepartmentRes, updateDepartmentReq>({
      query: ({body,id}) => ({
        url: `department/update/${id}`,
        method:"PUT",
        body
      })
    }),
    
  })
})

export const {useCreateDepartmentMutation, useGetDepartmentsQuery,useDeleteDepartmentMutation, useUpdateDepartmentMutation , useLazyGetDepartmentsQuery} = departmentApi