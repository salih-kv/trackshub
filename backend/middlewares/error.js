export const error = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const status = err.status;

  return res.status(statusCode).json({
    status: status || false,
    message,
  });
};
