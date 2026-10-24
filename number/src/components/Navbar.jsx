import { useState } from "react";
import pages from "../data/pages";

const Navbar = ({ currentPath, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (event, path) => {
    setIsMenuOpen(false);
    onNavigate(event, path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 shadow-sm backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <a
          href="/"
          onClick={(event) => handleNavigation(event, "/")}
          aria-label="Number Systems home"
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-indigo-700 via-violet-700 to-blue-600 font-mono text-xs font-black tracking-tight text-white shadow-md shadow-indigo-700/25 transition-transform group-hover:-rotate-6">
            01
          </span>
          <span className="bg-linear-to-r from-indigo-900 via-violet-800 to-blue-700 bg-clip-text text-lg font-black tracking-tight text-transparent sm:text-xl">
            Number Systems
          </span>
        </a>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-800 transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation-links"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-6"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <ul
          id="primary-navigation-links"
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } w-full flex-col gap-1 border-t border-slate-100 pt-3 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-1 sm:border-0 sm:pt-0`}
        >
          {pages.map(({ path, label }) => (
            <li key={path}>
              <a
                href={path}
                onClick={(event) => handleNavigation(event, path)}
                aria-current={currentPath === path ? "page" : undefined}
                className={`flex rounded-xl px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:py-2 ${
                  currentPath === path
                    ? "bg-indigo-100 text-indigo-900"
                    : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-800"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;