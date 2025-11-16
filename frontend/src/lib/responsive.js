import { useState, useEffect } from "react";

/**
 * Custom hook to detect screen size breakpoints
 * @returns {Object} - Object with breakpoint boolean values
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false
  });

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      setBreakpoint({
        isXs: width < 640,
        isSm: width >= 640,
        isMd: width >= 768,
        isLg: width >= 1024,
        isXl: width >= 1280,
        is2xl: width >= 1536
      });
    };

    // Check on mount
    checkBreakpoint();

    // Add event listener
    window.addEventListener("resize", checkBreakpoint);

    // Cleanup
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
}

/**
 * Custom hook to detect mobile devices
 * @returns {boolean} - Whether the device is mobile
 */
export function useIsMobile() {
  const { isXs, isSm } = useBreakpoint();
  return isXs || isSm;
}

/**
 * Custom hook to detect tablet devices
 * @returns {boolean} - Whether the device is tablet
 */
export function useIsTablet() {
  const { isMd, isLg } = useBreakpoint();
  return isMd || isLg;
}

/**
 * Custom hook to detect desktop devices
 * @returns {boolean} - Whether the device is desktop
 */
export function useIsDesktop() {
  const { isXl, is2xl } = useBreakpoint();
  return isXl || is2xl;
}

/**
 * Get responsive class names based on breakpoints
 * @param {Object} classes - Object with breakpoint keys and class values
 * @returns {string} - Combined class names
 */
export function getResponsiveClasses(classes) {
  const breakpoints = {
    xs: "max-sm:",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:"
  };

  return Object.entries(classes)
    .map(([breakpoint, className]) => {
      const prefix = breakpoints[breakpoint] || "";
      return `${prefix}${className}`;
    })
    .join(" ");
}

/**
 * Check if the current screen size matches a breakpoint
 * @param {string} breakpoint - Breakpoint name (xs, sm, md, lg, xl, 2xl)
 * @returns {boolean} - Whether the screen matches the breakpoint
 */
export function matchesBreakpoint(breakpoint) {
  const width = window.innerWidth;
  
  switch (breakpoint) {
    case "xs":
      return width < 640;
    case "sm":
      return width >= 640;
    case "md":
      return width >= 768;
    case "lg":
      return width >= 1024;
    case "xl":
      return width >= 1280;
    case "2xl":
      return width >= 1536;
    default:
      return false;
  }
}