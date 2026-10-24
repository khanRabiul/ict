import { useState } from "react";
import pages from "../data/pages";
import { Localized, useLanguage } from "../i18n";

const LanguageSwitch = ({ language, setLanguage }) => (
  <button
    type="button"
    onClick={() => setLanguage(language === "en" ? "bn" : "en")}
    aria-label="Switch language"
    role="switch"
    aria-checked={language === "bn"}
    className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border p-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
      language === "bn"
        ? "border-emerald-600 bg-emerald-600"
        : "border-slate-300 bg-slate-200"
    }`}
  >
    <span
      aria-hidden="true"
      className={`absolute text-[8px] font-extrabold leading-none tracking-wide ${
        language === "bn" ? "left-1 text-white" : "right-1 text-slate-600"
      }`}
    >
      {language === "en" ? "ENG" : "বাং"}
    </span>
    <span
      aria-hidden="true"
      className={`size-3.5 rounded-full bg-white shadow-sm transition-transform ${
        language === "bn" ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Navbar = ({ currentPath, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleNavigation = (event, path) => {
    setIsMenuOpen(false);
    onNavigate(event, path);
  };

  return (
    <Localized>
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 shadow-sm backdrop-blur-lg">
      <nav
        className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-1 px-4 py-3 sm:flex-nowrap sm:px-4 lg:px-6"
        aria-label="Main navigation"
      >
        <a
          href="/"
          onClick={(event) => handleNavigation(event, "/")}
          aria-label="Number Systems home"
          className="inline-flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          <span className="grid size-10 -rotate-12 place-items-center rounded-xl bg-linear-to-br from-indigo-700 via-violet-700 to-blue-600 font-mono text-lg font-black leading-none tracking-wide text-white shadow-lg shadow-indigo-700/30 transition-transform duration-500 ease-in-out hover:rotate-0">
            01
          </span>
          <span className="bg-linear-to-r from-indigo-900 via-violet-800 to-blue-700 bg-clip-text text-lg font-black tracking-tight text-transparent sm:text-xl">
            Number Systems
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <button
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-800 transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation-links"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`absolute size-6 transition-[opacity,transform,rotate] duration-300 ease-in-out motion-reduce:transition-none ${
                isMenuOpen
                  ? "-rotate-90 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`absolute size-6 transition-[opacity,transform,rotate] duration-300 ease-in-out motion-reduce:transition-none ${
                isMenuOpen
                  ? "rotate-180 scale-100 opacity-100"
                  : "rotate-0 scale-75 opacity-0"
              }`}
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <ul
          id="primary-navigation-links"
          data-open={isMenuOpen}
          className="mobile-nav-menu fixed inset-x-0 top-[4.25rem] bottom-0 z-50 flex w-full flex-col gap-1 bg-white/95 px-4 shadow-lg backdrop-blur-lg sm:static sm:inset-auto sm:bottom-auto sm:z-auto sm:w-auto sm:flex-row sm:items-center sm:gap-0.5 sm:bg-transparent sm:px-0 sm:shadow-none sm:backdrop-blur-none"
        >
          {pages.map(({ path, label }) => (
            <li key={path}>
              <a
                href={path}
                onClick={(event) => handleNavigation(event, path)}
                aria-current={currentPath === path ? "page" : undefined}
                className={`flex rounded-xl px-1.5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:py-2 md:px-2 md:text-base ${
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
        <div className="hidden shrink-0 sm:block">
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
      </nav>
    </header>
    </Localized>
  );
};

export default Navbar;