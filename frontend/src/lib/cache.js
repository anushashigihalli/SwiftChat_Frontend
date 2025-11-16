/**
 * Cache manager for storing and retrieving data
 */
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timeouts = new Map();
  }

  /**
   * Set a value in cache with expiration
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set(key, value, ttl = 5 * 60 * 1000) {
    // Clear existing timeout
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key));
    }

    // Set new value
    this.cache.set(key, value);

    // Set expiration timeout
    const timeout = setTimeout(() => {
      this.cache.delete(key);
      this.timeouts.delete(key);
    }, ttl);

    this.timeouts.set(key, timeout);
  }

  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {*} - Cached value or undefined
   */
  get(key) {
    return this.cache.get(key);
  }

  /**
   * Check if a key exists in cache
   * @param {string} key - Cache key
   * @returns {boolean} - Whether key exists in cache
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Delete a key from cache
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
    
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key));
      this.timeouts.delete(key);
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    
    // Clear all timeouts
    for (const timeout of this.timeouts.values()) {
      clearTimeout(timeout);
    }
    this.timeouts.clear();
  }

  /**
   * Get cache size
   * @returns {number} - Number of items in cache
   */
  size() {
    return this.cache.size;
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();

/**
 * Cache user data
 * @param {Object} user - User object
 */
export function cacheUser(user) {
  if (!user || !user._id) return;
  
  cacheManager.set(`user:${user._id}`, user, 10 * 60 * 1000); // 10 minutes
}

/**
 * Get cached user data
 * @param {string} userId - User ID
 * @returns {Object|undefined} - Cached user object or undefined
 */
export function getCachedUser(userId) {
  if (!userId) return undefined;
  
  return cacheManager.get(`user:${userId}`);
}

/**
 * Cache user list
 * @param {Array} users - Array of user objects
 */
export function cacheUsers(users) {
  if (!Array.isArray(users)) return;
  
  cacheManager.set("users", users, 5 * 60 * 1000); // 5 minutes
}

/**
 * Get cached user list
 * @returns {Array|undefined} - Cached user array or undefined
 */
export function getCachedUsers() {
  return cacheManager.get("users");
}