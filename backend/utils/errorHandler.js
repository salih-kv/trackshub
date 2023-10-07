export const errorHandler = (statusCode, message, status) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  error.status = status;
  return error;
};
