export interface CreateDictionaryReq {
  status: enums['historical' | 'futuristic'],
  word: string,
  definition: string,
  image: string
}

export interface CreateDictionaryRes {
  success: boolean,
  msg: string
}