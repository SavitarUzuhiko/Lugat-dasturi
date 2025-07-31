import { baseApi } from '../baseApi';
import type { CreateDictionaryReq, CreateDictionaryRes } from './types';

export const dictionaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDictionary: builder.mutation<
      CreateDictionaryRes,
      CreateDictionaryReq
    >({
      query: (credentials) => ({
        url: '/dictionary/add',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useCreateDictionaryMutation } = dictionaryApi;
