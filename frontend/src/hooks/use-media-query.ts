import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * Updates the returned value whenever the match state changes.
 *
 * Uses `useSyncExternalStore` for safe concurrent subscription semantics
 * (no cascading renders, tear-free reads).
 *
 * @example
 *   const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (notify: () => void) => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return () => {};
    }
    const mql = window.matchMedia(query);
    mql.addEventListener("change", notify);
    return () => {
      mql.removeEventListener("change", notify);
    };
  };

  const getSnapshot = () => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
