import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to #anchor when the URL contains a hash (e.g. /#contact, /projects#marketpulse). */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el =
      document.getElementById(id) ??
      document.getElementById(`project-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname, hash]);

  return null;
}
