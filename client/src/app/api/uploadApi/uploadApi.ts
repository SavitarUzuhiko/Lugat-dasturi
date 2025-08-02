import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UploadRes } from "../dictionaryApi/types";

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
  }),
  endpoints: (builder) => ({
    upload: builder.mutation<UploadRes,FormData>({
      query: (data) => ({
        url: 'upload',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useUploadMutation } = uploadApi