export interface Dictionary {
  _id?: string;
  word: string;
  definition?: string;
  image?: string;
}

export interface Department {
  _id?: string,
  name: string,
  dictionary: Dictionary,
  image?: string
}

export interface Category {
  _id?: string,
  name: string,
  dictionary: Dictionary | string,
  department: Department | string
}

export interface Word {
  _id?: string,
  word: string,
  definition?: string,
  category: Category
  image?:string
}