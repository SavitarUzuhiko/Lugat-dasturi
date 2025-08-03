import type { DictionaryData } from "../dictionaryApi/types";

export interface createDepartmentReq extends Data {}

export interface DepartmentRes {
  success: Boolean;
  msg: string;
}

export interface getDepartmentReq {
  dict:string,
  search?:string
}

export interface Data {
  _id?:string;
  name?:string;
  dictionary?:DictionaryData | string;
  image?:string;
}

export interface getDepartmentRes {
  data:Data[],
  length:Number,
  page:Number,
  limit:Number,
  total:Number
}
export interface deleteDepartmentReq {
  _id:string
}

export interface updateDepartmentReq extends deleteDepartmentReq, Data {}
