const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const { jwt_token } = require("../utils/secret");

module.exports = (req,res,next) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new HttpException(401, "Unauthorized");

  const token = authorization.split(" ")[1];
  if (!token) throw new HttpException(401, "Unauthorized");

  const decoded = jwt.verify(token, jwt_token);
  if (!decoded) throw new HttpException(401, "Unauthorized");

  req.user = decoded

  next();
}