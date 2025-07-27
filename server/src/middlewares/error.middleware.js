const errorMiddleware = (error, req, res, next) => {
  const msg = error.msg || error.message || "Gateway Error";
  res.status(error.status || 500).json({ msg });
}
module.exports = {errorMiddleware}