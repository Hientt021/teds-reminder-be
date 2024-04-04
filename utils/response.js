export const successResponse = (data, message) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message) => {
  return {
    success: false,
    message,
  };
};
