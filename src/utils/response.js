export const response = (code, message, data) => {
  if (code >= 200 || code <= 299) {
    return {
      success: true,
      message,
      data,
    };
  } else {
    return {
      success: false,
      message,
    };
  }
};
