import toast from "react-hot-toast";

/**
 * Show a success notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options for the toast
 * @returns {string} - Toast ID
 */
export function showSuccess(message, options = {}) {
  return toast.success(message, {
    duration: 3000,
    ...options
  });
}

/**
 * Show an error notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options for the toast
 * @returns {string} - Toast ID
 */
export function showError(message, options = {}) {
  return toast.error(message, {
    duration: 5000,
    ...options
  });
}

/**
 * Show an info notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options for the toast
 * @returns {string} - Toast ID
 */
export function showInfo(message, options = {}) {
  return toast(message, {
    duration: 4000,
    ...options
  });
}

/**
 * Show a warning notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options for the toast
 * @returns {string} - Toast ID
 */
export function showWarning(message, options = {}) {
  return toast(message, {
    icon: "⚠️",
    duration: 4000,
    ...options
  });
}

/**
 * Show a loading notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options for the toast
 * @returns {string} - Toast ID
 */
export function showLoading(message = "Loading...", options = {}) {
  return toast.loading(message, options);
}

/**
 * Dismiss a notification
 * @param {string} toastId - The ID of the toast to dismiss
 */
export function dismissNotification(toastId) {
  toast.dismiss(toastId);
}

/**
 * Dismiss all notifications
 */
export function dismissAllNotifications() {
  toast.dismiss();
}

/**
 * Update a notification
 * @param {string} toastId - The ID of the toast to update
 * @param {Object} options - New options for the toast
 */
export function updateNotification(toastId, options) {
  toast.update(toastId, options);
}