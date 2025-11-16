import toast from "react-hot-toast";

/**
 * Handle API errors consistently across the application
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default message to show if no specific error message is available
 * @returns {string} - The error message that was displayed
 */
export function handleApiError(error, defaultMessage = "An unexpected error occurred") {
  console.error("API Error:", error);
  
  let errorMessage = defaultMessage;
  
  // Handle network errors
  if (error.code === "ERR_NETWORK") {
    errorMessage = "Network error. Please check your connection and try again.";
  }
  // Handle HTTP errors
  else if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || "Bad request. Please check your input.";
        break;
      case 401:
        errorMessage = data?.message || "Unauthorized. Please log in again.";
        break;
      case 403:
        errorMessage = data?.message || "Access forbidden.";
        break;
      case 404:
        errorMessage = data?.message || "Resource not found.";
        break;
      case 409:
        errorMessage = data?.message || "Conflict. This resource may already exist.";
        break;
      case 422:
        errorMessage = data?.message || "Validation error. Please check your input.";
        break;
      case 500:
        errorMessage = data?.message || "Internal server error. Please try again later.";
        break;
      case 502:
      case 503:
      case 504:
        errorMessage = "Service temporarily unavailable. Please try again later.";
        break;
      default:
        errorMessage = data?.message || defaultMessage;
    }
  }
  // Handle timeout errors
  else if (error.code === "ECONNABORTED") {
    errorMessage = "Request timeout. Please try again.";
  }
  // Handle other errors
  else if (error.message) {
    errorMessage = error.message;
  }
  
  toast.error(errorMessage);
  return errorMessage;
}

/**
 * Handle form validation errors
 * @param {Object} errors - Validation errors object
 * @param {string} prefix - Prefix for error messages
 */
export function handleValidationErrors(errors, prefix = "") {
  if (!errors) return;
  
  Object.keys(errors).forEach(key => {
    const errorMessage = errors[key];
    toast.error(prefix ? `${prefix}: ${errorMessage}` : errorMessage);
  });
}