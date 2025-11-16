/**
 * Generate initials from a user's name
 * @param {string} name - User's full name
 * @returns {string} - Initials (max 2 characters)
 */
export function generateInitials(name) {
  if (!name) return "U"; // Unknown user
  
  // Split name by spaces and take first letter of first two words
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
  
  return initials || "U";
}

/**
 * Generate a color based on user ID for consistent avatar colors
 * @param {string} userId - User ID
 * @returns {string} - CSS color value
 */
export function generateAvatarColor(userId) {
  if (!userId) return "#cccccc"; // Default gray
  
  // Simple hash function to generate consistent colors
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate HSL color
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 45%)`;
}

/**
 * Get avatar URL with fallback
 * @param {string} profilePic - User's profile picture URL
 * @param {string} fullName - User's full name
 * @returns {Object} - Object with avatar URL and fallback info
 */
export function getAvatarInfo(profilePic, fullName) {
  const hasProfilePic = !!profilePic && profilePic !== "undefined";
  
  return {
    url: hasProfilePic ? profilePic : null,
    initials: generateInitials(fullName),
    color: generateAvatarColor(fullName || "unknown"),
    hasProfilePic
  };
}

/**
 * Generate a gradient background for avatar
 * @param {string} userId - User ID
 * @returns {string} - CSS gradient value
 */
export function generateAvatarGradient(userId) {
  if (!userId) return "linear-gradient(45deg, #cccccc, #999999)";
  
  // Generate two colors for gradient
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 180) % 360;
  
  return `linear-gradient(45deg, hsl(${hue1}, 70%, 45%), hsl(${hue2}, 70%, 45%))`;
}