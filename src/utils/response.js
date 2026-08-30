export const success = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    ok: true,
    data,
  });
};
export const failure = (res, error, statusCode = 400) => {
  res.status(statusCode).json({
    ok: false,
    error,
  });
};
