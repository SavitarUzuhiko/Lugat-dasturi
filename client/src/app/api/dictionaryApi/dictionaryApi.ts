import { baseApi } from '../baseApi';
import type {
  CreateDictionaryReq,
  CreateDictionaryRes,
  DeleteDictionaryReq,
  DeleteDictionaryRes,
  DictionaryData,
  GetDictionaryReq,
  GetDictionaryRes,
  UpdateDictionaryReq,
  UpdateDictionaryRes,
} from './types';

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
    getDictionary: builder.query<GetDictionaryRes, GetDictionaryReq>({
      query: ({ search, type, ...rest }) => {
        const params: Record<string, any> = { ...rest };
        if (search) params.search = search;
        if (type) params.type = type;
        console.log(params);
        return {
          url: '/dictionary/all',
          method: 'GET',
          params,
        };
      },
    }),
    getById: builder.query<DictionaryData, DeleteDictionaryReq>({
      query: ({id}) => ({
        url:'dictionary/get-one/' + id,
        method:'GET'
      })
    }),
    deleteDictionary: builder.mutation<DeleteDictionaryRes,DeleteDictionaryReq>({
      query: (credentials) => ({
          url: '/dictionary/delete/' + credentials.id,
          method: 'DELETE',
        })
    }),
    updateDictionary: builder.mutation<UpdateDictionaryRes, UpdateDictionaryReq>({
      query : (credentials) => ({
        url: 'dictionary/update/' + credentials._id,
        method: 'PUT',
        body : credentials
      })
    })
  }),
});

export const { useCreateDictionaryMutation, useLazyGetByIdQuery ,
  useGetByIdQuery, useGetDictionaryQuery, useDeleteDictionaryMutation, useUpdateDictionaryMutation} = dictionaryApi;
