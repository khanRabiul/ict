
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
    <>
      <section
        hidden={page !== "home"}
        className="mx-auto max-w-6xl px-6 pb-4 pt-12 sm:pt-16"
      >
        <div className="rounded-[28px] border border-white/80 bg-white/80 p-7 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.25)] backdrop-blur-sm sm:p-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-indigo-700">
            Learn by exploring
          </p>
          <h1 className="max-w-3xl bg-linear-to-r from-indigo-800 via-violet-700 to-blue-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl">
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
              className="rounded-xl bg-linear-to-r from-indigo-700 to-violet-700 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
            >
              Try the converter
            </a>
            <a
              href="/counters"
              onClick={(event) => onNavigate(event, "/counters")}
              className="rounded-xl border border-indigo-200 bg-white px-5 py-3 font-bold text-indigo-800 transition hover:bg-indigo-50"
            >
              Explore counters
            </a>
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
          <h1 className="mb-6 bg-linear-to-r from-blue-800 via-indigo-700 to-violet-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
            Number System Counters
          </h1>

          <div
            className="mb-6 grid grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-inner sm:grid-cols-4"
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
                className={`rounded-xl px-3 py-3 text-sm font-bold transition-all ${
                  activeSystem === id
                    ? "bg-linear-to-r from-blue-700 to-violet-700 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-600 hover:bg-white hover:text-indigo-700"
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
  );
};

export default NumberSystem;
