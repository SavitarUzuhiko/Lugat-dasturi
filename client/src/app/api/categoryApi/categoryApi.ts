import { baseApi } from "../baseApi";
import type { GetCategoriesReq, GetCategoriesRes } from "./types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints : builder => ({
    createCategory : builder.mutation({
      query : (credentials) => ({
        url : 'category/add',
        method : 'POST',
        body : credentials
      })
    }),
    getCategories: builder.query<GetCategoriesRes, GetCategoriesReq>({
      query: ({ page = 1, limit = 10, dict = '', dep = '', search = '' }) => {
        const params: Record<string, any> = { page, limit, dict, dep };
        if (search) params.search = search;
        return {
          url: 'category/all',
          method: 'GET',
          params,
        };
      },
    }),
    deleteCategory : builder.mutation({
      query : (credentials) => ({
        url : 'category/delete/' + credentials._id,
        method : 'DELETE'
      })
    }),
    updateCategory : builder.mutation({
      query : (credentials) => ({
        url : 'category/update/' + credentials._id,
        method : 'PUT',
        body : credentials
      })
    })
  }),
})

export const {useCreateCategoryMutation, useGetCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation} = categoryApi