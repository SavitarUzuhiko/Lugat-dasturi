import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://localhost:5000/';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials:"include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if(token) return headers.set('authorization', `Bearer ${token}`)
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Auth'],
})