function apiResponse({ data = null, message = "Success", status = "success", errorCode = null }) {
    if (status === "success") {
      return {
        status,
        message,
        data
      };
    } else {
      return {
        status,
        message,
        errorCode,
        data: null
      };
    }
  }
  
  module.exports = apiResponse;
  