import type React from "react";

/**
 * Smoothly scrolls to an element on the page, even if the URL hash is already matching.
 * Updates history state without triggering page reload or Next.js router cancellation.
 *
 * @param targetId - The element ID or hash (e.g. "reservasi" or "#reservasi")
 * @param e - Optional React MouseEvent to prevent default anchor behavior
 */
export function smoothScrollTo(targetId: string, e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  const id = targetId.replace(/^#/, "");
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", `#${id}`);
    }
  }
}
