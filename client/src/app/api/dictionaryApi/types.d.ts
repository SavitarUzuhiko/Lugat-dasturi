export interface CreateDictionaryReq {
  status: enums['historical' | 'futuristic'];
  word: string;
  definition: string;
  image: string;
}
export interface DictionaryData extends CreateDictionaryReq {
  _id: string;
}

export interface CreateDictionaryRes {
  success: boolean;
  msg: string;
}

export interface GetDictionaryReq {
  page?: number;
  limit?: number;
  type?: enums['historical' | 'futuristic'];
  search?: string;
}

export interface GetDictionaryRes extends CreateDictionaryRes {
  data: DictionaryData[];
}

export interface DeleteDictionaryReq {
  id: string;
}
export interface DeleteDictionaryRes extends CreateDictionaryRes {}

export interface UpdateDictionaryReq extends DictionaryData {}

export interface UpdateDictionaryRes extends DeleteDictionaryRes {}

export interface FormInputs {
  word: string;
  definition?: string;
  status: 'historical' | 'futuristic' | '';
  image?:string;
}

export 

export interface UploadRes {
  success: Boolean;
  msg: string;
  filePath: string;
}
// {success: true, msg: 'File uploaded successfully', filePath: 'https://savitar-kitchen-dictionary.s3.eu-north-1.a…m/images/3c398e29-e6c4-4b81-ad65-93a17365d822.ico'}