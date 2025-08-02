import { baseApi } from '../baseApi';
import type { LoginRes, LoginReq, User } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    registr: builder.mutation<LoginRes, LoginReq>({
      query: (credentials) => ({
        url: '/auth/registr',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Login
    login: builder.mutation<LoginRes, LoginReq>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Get current user (me)
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const { useRegistrMutation, useLoginMutation, useGetMeQuery } = authApi;
