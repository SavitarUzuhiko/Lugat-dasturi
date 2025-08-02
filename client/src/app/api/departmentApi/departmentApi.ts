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
      query: ({ dict = '', search = ''}) => {
        if(search && search !== '') return `/department/all?dict=${dict}&search=${search}`
        else return `/department/all?dict=${dict}`
      }
    }),
    
    deleteDepartment: builder.mutation<DepartmentRes,deleteDepartmentReq>({
      query: ({_id}) => ({
        url: `department/delete/${_id}`,
        method:"DELETE",
      })
    }),
    updateDepartment: builder.mutation<DepartmentRes, updateDepartmentReq>({
      query: (body) => ({
        url: `department/update/${body._id}`,
        method:"PUT",
        body
      })
    }),
    
  })
})

export const {useCreateDepartmentMutation, useGetDepartmentsQuery,useDeleteDepartmentMutation, useUpdateDepartmentMutation , useLazyGetDepartmentsQuery} = departmentApi