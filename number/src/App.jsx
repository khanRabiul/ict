
import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import NumberSystem from "./components/NumberSystem";
import pages from "./data/pages";

function App() {
  const pageContentRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    return pages.some((item) => item.path === path) ? path : "/";
  });
  const previousPathRef = useRef(currentPath);

  useEffect(() => {
    const syncPath = () => {
      const path = window.location.pathname.replace(/\/+$/, "") || "/";
      setCurrentPath(pages.some((item) => item.path === path) ? path : "/");
    };

    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    if (previousPathRef.current === currentPath) return;
    previousPathRef.current = currentPath;

    const pageContent = pageContentRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!pageContent || prefersReducedMotion) return;

    pageContent.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 240,
        easing: "ease-out",
      }
    );
  }, [currentPath]);

  const navigate = (event, path) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <div ref={pageContentRef}>
        <NumberSystem
          page={currentPath.slice(1) || "home"}
          onNavigate={navigate}
        />
      </div>
      <Analytics />
    </div>
  );
}

export default App;
