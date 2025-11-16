/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
export function sanitizeInput(input) {
  if (!input) return "";
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, "");
  
  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
  
  return sanitized;
}

/**
 * Validate and sanitize email address
 * @param {string} email - Email address
 * @returns {string|null} - Sanitized email or null if invalid
 */
export function validateAndSanitizeEmail(email) {
  if (!email) return null;
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return null;
  
  // Sanitize email
  return email.trim().toLowerCase();
}