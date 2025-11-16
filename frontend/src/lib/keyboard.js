/**
 * Check if a keyboard event matches a specific key combination
 * @param {KeyboardEvent} event - The keyboard event
 * @param {string} key - The key to check for
 * @param {boolean} ctrl - Whether Ctrl key should be pressed
 * @param {boolean} shift - Whether Shift key should be pressed
 * @param {boolean} alt - Whether Alt key should be pressed
 * @returns {boolean} - Whether the event matches the key combination
 */
export function isKeyCombo(event, key, ctrl = false, shift = false, alt = false) {
  return (
    event.key === key &&
    event.ctrlKey === ctrl &&
    event.shiftKey === shift &&
    event.altKey === alt
  );
}

/**
 * Check if a keyboard event is for submitting a form
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean} - Whether the event is for submitting a form
 */
export function isSubmitKey(event) {
  // Enter without shift (to allow Shift+Enter for new lines)
  return isKeyCombo(event, "Enter") && !event.shiftKey;
}

/**
 * Check if a keyboard event is for canceling an action
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean} - Whether the event is for canceling an action
 */
export function isCancelKey(event) {
  return isKeyCombo(event, "Escape");
}

/**
 * Check if a keyboard event is for focusing the search/input
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean} - Whether the event is for focusing search/input
 */
export function isFocusSearchKey(event) {
  return isKeyCombo(event, "k", true) || isKeyCombo(event, "/", true);
}

/**
 * Prevent default behavior for specific keys
 * @param {KeyboardEvent} event - The keyboard event
 * @param {string[]} keys - Array of keys to prevent default for
 */
export function preventDefaultForKeys(event, keys) {
  if (keys.includes(event.key)) {
    event.preventDefault();
  }
}