import { useMemo, useCallback } from "react";

/**
 * Debounce function to limit the rate at which a function is called
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, delay) {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle function to limit the rate at which a function is called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Custom hook to debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function useDebounce(func, delay) {
  return useMemo(() => debounce(func, delay), [func, delay]);
}

/**
 * Custom hook to throttle a function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function useThrottle(func, limit) {
  return useMemo(() => throttle(func, limit), [func, limit]);
}

/**
 * Memoize component props to prevent unnecessary re-renders
 * @param {Object} props - Component props
 * @param {Array} dependencies - Dependencies to watch
 * @returns {Object} - Memoized props
 */
export function useMemoizedProps(props, dependencies) {
  return useMemo(() => props, dependencies);
}

/**
 * Optimize event handlers to prevent unnecessary re-creations
 * @param {Function} handler - Event handler function
 * @param {Array} dependencies - Dependencies to watch
 * @returns {Function} - Optimized event handler
 */
export function useOptimizedCallback(handler, dependencies) {
  return useCallback(handler, dependencies);
}

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} element - Image element
 * @param {string} src - Image source
 */
export function lazyLoadImage(element, src) {
  if (!element || !src) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });
  
  observer.observe(element);
  
  // Cleanup function
  return () => observer.unobserve(element);
}

/**
 * Preload images to improve perceived performance
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls) {
  if (!Array.isArray(imageUrls)) return;
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

/**
 * Measure component render performance
 * @param {string} componentName - Component name
 * @param {Function} renderFunction - Render function
 * @returns {*} - Render result
 */
export function measureRenderPerformance(componentName, renderFunction) {
  if (process.env.NODE_ENV === "development") {
    const start = performance.now();
    const result = renderFunction();
    const end = performance.now();
    
    console.log(`${componentName} render time: ${end - start}ms`);
    return result;
  }
  
  return renderFunction();
}