/**
 * Focus management utilities
 */

/**
 * Focus the first focusable element in a container
 * @param {HTMLElement} container - The container element
 */
export function focusFirstElement(container) {
  if (!container) return;
  
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

/**
 * Trap focus within a container
 * @param {HTMLElement} container - The container element
 * @param {KeyboardEvent} event - The keyboard event
 */
export function trapFocus(container, event) {
  if (!container || event.key !== "Tab") return;
  
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

/**
 * Accessibility labels and descriptions
 */

/**
 * Generate ARIA label for user status
 * @param {string} fullName - User's full name
 * @param {boolean} isOnline - Whether the user is online
 * @returns {string} - ARIA label
 */
export function getUserStatusAriaLabel(fullName, isOnline) {
  return `${fullName} is ${isOnline ? "online" : "offline"}`;
}

/**
 * Generate ARIA label for message
 * @param {string} senderName - Sender's name
 * @param {string} messageText - Message text
 * @param {string} timestamp - Message timestamp
 * @returns {string} - ARIA label
 */
export function getMessageAriaLabel(senderName, messageText, timestamp) {
  const time = new Date(timestamp).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
  
  return `${senderName} at ${time}: ${messageText}`;
}

/**
 * Generate ARIA label for navigation
 * @param {string} pageName - Page name
 * @param {boolean} isActive - Whether the page is currently active
 * @returns {string} - ARIA label
 */
export function getNavigationAriaLabel(pageName, isActive) {
  return `${pageName} page${isActive ? " (current)" : ""}`;
}

/**
 * High contrast mode utilities
 */

/**
 * Check if high contrast mode is enabled
 * @returns {boolean} - Whether high contrast mode is enabled
 */
export function isHighContrastMode() {
  return window.matchMedia("(prefers-contrast: high)").matches;
}

/**
 * Get high contrast class names
 * @param {string} baseClass - Base class name
 * @param {string} highContrastClass - High contrast class name
 * @returns {string} - Combined class names
 */
export function getHighContrastClass(baseClass, highContrastClass) {
  return isHighContrastMode() ? `${baseClass} ${highContrastClass}` : baseClass;
}

/**
 * Reduced motion utilities
 */

/**
 * Check if reduced motion is preferred
 * @returns {boolean} - Whether reduced motion is preferred
 */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get animation class names based on reduced motion preference
 * @param {string} animatedClass - Animated class name
 * @returns {string} - Conditional class name
 */
export function getAnimationClass(animatedClass) {
  return prefersReducedMotion() ? "" : animatedClass;
}

/**
 * Screen reader utilities
 */

/**
 * Announce a message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - Priority level (polite, assertive)
 */
export function announceToScreenReader(message, priority = "polite") {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement is read
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Hide element visually but keep it accessible to screen readers
 * @param {HTMLElement} element - Element to hide
 */
export function hideVisually(element) {
  if (!element) return;
  
  element.classList.add("sr-only");
}

/**
 * Show element visually and to screen readers
 * @param {HTMLElement} element - Element to show
 */
export function showVisually(element) {
  if (!element) return;
  
  element.classList.remove("sr-only");
}