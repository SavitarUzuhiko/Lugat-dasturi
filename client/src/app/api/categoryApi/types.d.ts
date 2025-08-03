import type { Category } from "../baseApi/types";
import { GetCategoriesRes } from './types.d';

export interface AddCategoryRes {
  data:Category[],
  length: Number,
  page: Number,
  limit: Number
}

export interface GetCategoriesReq {
  page?: Number,
  limit?: Number,
  dict?: string,
  dep?: string,
  search?: string
}

export interface GetCategoriesRes {
  data:Category[],
  length: Number,
  page: Number,
  limit: Number
}