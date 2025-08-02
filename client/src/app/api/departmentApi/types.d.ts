export interface createDepartmentReq extends Data {}

export interface DepartmentRes {
  success: Boolean;
  msg: string;
}

export interface getDepartmentReq {
  page?:Number;
  limit?:Number,
  dict:string,
  search?:string
}

export interface Data {
  name:string;
  dictionary:DictionaryData;
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
  id:string
}

export interface updateDepartmentReq extends deleteDepartmentReq {
  body: Data;
}
