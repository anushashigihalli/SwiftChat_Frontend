/**
 * Format user's online status
 * @param {boolean} isOnline - Whether the user is online
 * @returns {string} - Formatted status string
 */
export function formatUserStatus(isOnline) {
  return isOnline ? "Online" : "Offline";
}

/**
 * Get user status badge class
 * @param {boolean} isOnline - Whether the user is online
 * @returns {string} - CSS class for the status badge
 */
export function getUserStatusClass(isOnline) {
  return isOnline ? "bg-green-500" : "bg-gray-400";
}

/**
 * Check if user is recently online (within last 5 minutes)
 * @param {string|Date} lastSeen - Last seen timestamp
 * @returns {boolean} - Whether user is recently online
 */
export function isRecentlyOnline(lastSeen) {
  if (!lastSeen) return false;
  
  const lastSeenDate = new Date(lastSeen);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  return lastSeenDate > fiveMinutesAgo;
}

/**
 * Format last seen time
 * @param {string|Date} lastSeen - Last seen timestamp
 * @returns {string} - Formatted last seen time
 */
export function formatLastSeen(lastSeen) {
  if (!lastSeen) return "Never";
  
  const lastSeenDate = new Date(lastSeen);
  const now = new Date();
  const diffMs = now - lastSeenDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  
  return lastSeenDate.toLocaleDateString();
}