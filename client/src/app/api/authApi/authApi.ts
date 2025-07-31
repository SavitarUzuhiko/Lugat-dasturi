import { baseApi } from '../baseApi';
import type { LoginRes, LoginReq } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registr: builder.mutation<LoginReq, LoginRes>({
      query: (credentials) => ({
        url: '/auth/registr',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<LoginReq, LoginRes>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {useRegistrMutation , useLoginMutation} = authApi