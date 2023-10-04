export const errorHandler = (statuscode, message, status) => {
  const error = new Error();
  error.statuscode = statuscode;
  error.message = message;
  error.status = status;
  return error;
};
