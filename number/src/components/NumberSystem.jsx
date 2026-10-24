
import { useEffect, useRef, useState } from "react";
import numberSystems from "../data/numberSystems";
import About from "./About";
import Binary from "../systems/Binary";
import Decimal from "../systems/Decimal";
import Hexadecimal from "../systems/Hexadecimal";
import Octal from "../systems/Octal";
import NumberConversion from "./NumberConversion";
import Quiz from "./Quiz";
import TestYourSelf from "./TestYourSelf";
import { Localized } from "../i18n";

const NumberSystem = ({ page, onNavigate }) => {
  const [activeSystem, setActiveSystem] = useState("decimal");
  const countersRef = useRef(null);
  const decimalSystem = numberSystems.find((system) => system.id === "decimal");
  const binarySystem = numberSystems.find((system) => system.id === "binary");
  const octalSystem = numberSystems.find((system) => system.id === "octal");
  const hexadecimalSystem = numberSystems.find(
    (system) => system.id === "hexadecimal"
  );

  useEffect(() => {
    const selectedPanel = countersRef.current?.querySelector(
      '[role="tabpanel"]:not([hidden])'
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!selectedPanel || prefersReducedMotion) return;

    selectedPanel.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  }, [activeSystem]);

  return (
    <Localized>
    <>
      <section
        hidden={page !== "home"}
        className="mx-auto max-w-6xl px-6 pb-4 pt-12 sm:pt-16"
      >
        <div className="relative isolate overflow-hidden rounded-[28px] border border-indigo-100/80 bg-gradient-to-br from-sky-50/95 via-cyan-50/90 to-rose-50/85 p-7 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.3)] backdrop-blur-sm sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gradient-to-br from-cyan-300/40 via-sky-300/25 to-transparent blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-1/3 size-64 rounded-full bg-gradient-to-br from-rose-300/30 via-violet-300/25 to-transparent blur-3xl" />
          <div className="relative z-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-indigo-700">
            Learn by exploring
          </p>
          <h1 className="max-w-3xl bg-linear-to-r from-indigo-800 via-violet-700 via-55% to-rose-600 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl">
            Understand number systems, one digit at a time.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Convert numbers, compare Decimal, Octal, Hexadecimal, and Binary,
            and practice what you learn.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/converter"
              onClick={(event) => onNavigate(event, "/converter")}
              className="rounded-xl bg-linear-to-r from-indigo-700 via-violet-700 to-rose-600 px-5 py-3 font-bold text-white shadow-lg shadow-violet-600/25 transition hover:brightness-110"
            >
              Try the converter
            </a>
            <a
              href="/counters"
              onClick={(event) => onNavigate(event, "/counters")}
              className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 px-5 py-3 font-bold text-teal-800 shadow-sm shadow-teal-900/5 transition hover:border-teal-300 hover:from-teal-100 hover:to-cyan-100"
            >
              Explore counters
            </a>
          </div>
          </div>
        </div>
      </section>
      <div hidden={page !== "converter"}>
        <NumberConversion />
      </div>
      <div hidden={page !== "test-skills"}>
        <TestYourSelf />
      </div>
      <div hidden={page !== "quiz"}>
        <Quiz />
      </div>
      <div hidden={page !== "about"}>
        <About />
      </div>
      <section
        ref={countersRef}
        hidden={page !== "counters"}
      >
        <div className="mx-auto max-w-xl px-6 pt-12 sm:pt-16">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-blue-700">
            Number systems
          </p>
          <h1 className="mb-6 bg-linear-to-r from-blue-800 via-indigo-700 to-violet-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl capitalize">
            Number system Counters
          </h1>

          <div
            className="mb-6 grid grid-cols-2 gap-1 sm:grid-cols-4"
            role="tablist"
            aria-label="Select a number system"
          >
            {[
              { id: "decimal", label: "Decimal" },
              { id: "octal", label: "Octal" },
              { id: "hexadecimal", label: "Hexadecimal" },
              { id: "binary", label: "Binary" },
            ].map(({ id, label }) => (
              <button
                key={id}
                id={`${id}-counter-tab`}
                type="button"
                role="tab"
                aria-selected={activeSystem === id}
                aria-controls={`${id}-counter-panel`}
                tabIndex={activeSystem === id ? 0 : -1}
                onClick={() => setActiveSystem(id)}
                className={`rounded-xl border px-3 py-3 text-sm font-bold transition-all ${
                  activeSystem === id
                    ? "border-cyan-300 bg-linear-to-r from-cyan-600 via-blue-700 to-indigo-700 text-white shadow-lg shadow-cyan-700/20"
                    : "border-indigo-100/80 bg-indigo-50/50 text-slate-600 hover:border-rose-200 hover:bg-gradient-to-r hover:from-rose-50 hover:to-cyan-50 hover:text-indigo-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {decimalSystem && (
          <div
            id="decimal-counter-panel"
            role="tabpanel"
            aria-labelledby="decimal-counter-tab"
            hidden={activeSystem !== "decimal"}
          >
            <Decimal system={decimalSystem} />
          </div>
        )}
        {octalSystem && (
          <div
            id="octal-counter-panel"
            role="tabpanel"
            aria-labelledby="octal-counter-tab"
            hidden={activeSystem !== "octal"}
          >
            <Octal system={octalSystem} />
          </div>
        )}
        {hexadecimalSystem && (
          <div
            id="hexadecimal-counter-panel"
            role="tabpanel"
            aria-labelledby="hexadecimal-counter-tab"
            hidden={activeSystem !== "hexadecimal"}
          >
            <Hexadecimal system={hexadecimalSystem} />
          </div>
        )}
        {binarySystem && (
          <div
            id="binary-counter-panel"
            role="tabpanel"
            aria-labelledby="binary-counter-tab"
            hidden={activeSystem !== "binary"}
          >
            <Binary system={binarySystem} />
          </div>
        )}
      </section>
    </>
    </Localized>
  );
};

export default NumberSystem;
