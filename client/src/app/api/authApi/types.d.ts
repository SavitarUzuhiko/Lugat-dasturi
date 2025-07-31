export type LoginRes = {
  email: string;
  password: string;
};

export type LoginReq = {
  success:boolean,
  msg: string,
  token: string
}