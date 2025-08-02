export type LoginReq = {
  email: string;
  password: string;
};

export type LoginRes = {
  success:boolean,
  msg: string,
  token: string
}
export type User = {
  _id: string;
  email: string;
  isActivate: boolean;
};
