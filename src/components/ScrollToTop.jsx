import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top whenever the user opens a different page.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
