import { useEffect, useState } from "react";
import AnimationSpeed from "../components/AnimationSpeed";
import { Localized } from "../i18n";

function RollingDigit({ value, place, symbols, duration }) {
  const base = symbols.length;
  const position = Math.floor(value / place);
  const digits = Array.from(
    { length: position + base + 3 },
    (_, index) => symbols[index % base]
  );

  return (
    <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-b from-[#10172e] via-[#172554] to-[#111827] text-cyan-300 shadow-[inset_0_2px_8px_rgba(103,232,249,0.15),0_6px_15px_rgba(30,41,59,0.2)] ring-1 ring-cyan-400/30">
      <div
        className="transition-transform ease-in-out"
        style={{
          transform: `translateY(-${position * 5}rem)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {digits.map((digit, index) => (
          <div
            key={index}
            className="flex h-20 items-center justify-center font-mono text-5xl font-bold"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

function CounterDisplay({ count, system, duration }) {
  const places = [];
  let place = 1;

  while (place <= Math.max(count, 1)) {
    places.push(place);
    place *= system.base;
  }

  places.reverse();
  const formattedCount = count.toString(system.base).toUpperCase();

  return (
    <Localized>
    <>
      <div
        className="my-8 flex flex-wrap items-center justify-center gap-2.5"
        role="img"
        aria-label={`Current number ${formattedCount}`}
      >
        {places.map((digitPlace) => (
          <RollingDigit
            key={digitPlace}
            value={count}
            place={digitPlace}
            symbols={system.symbols}
            duration={duration}
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl border border-blue-100 bg-white/80 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Current number</p>
          <p className="mt-1 break-all bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text font-mono text-3xl font-black text-transparent">
            {formattedCount}
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-violet-100 bg-white/80 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Decimal number</p>
          <p className="mt-1 break-all font-mono text-3xl font-black text-slate-800">
            {count.toLocaleString("en-US")}
          </p>
        </div>
      </div>
    </>
    </Localized>
  );
}

const Binary = ({ system }) => {
  const [activeTab, setActiveTab] = useState("automatic");
  const [automaticCount, setAutomaticCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [manualCount, setManualCount] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(500);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setAutomaticCount((previousCount) => previousCount + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [automaticCount, isPlaying]);

  const resetAutomatic = () => {
    setIsPlaying(false);
    setAutomaticCount(0);
  };

  const resetManual = () => {
    setManualCount(0);
  };

  const nextManual = () => {
    setManualCount((previousCount) => previousCount + 1);
  };

  const previousManual = () => {
    setManualCount((previousCount) => Math.max(0, previousCount - 1));
  };

  return (
    <Localized>
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#e0f2fe_0%,_#f1f5f9_42%,_#ede9fe_100%)] px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-blue-700">
          Number systems
        </p>

        <h1 className="mb-8 bg-gradient-to-r from-blue-800 via-indigo-700 to-violet-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
          {system.name} Counter
        </h1>

        <article className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.3)] backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-base font-black text-white shadow-lg shadow-indigo-500/30">
                {system.base}
              </div>

              <h2 className="text-lg font-extrabold text-slate-800">
                {system.name} number counter
              </h2>
            </div>

            <span className="rounded-full border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-800">
              Base {system.base} · {system.badge}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Automatic and manual counting have separate values and controls.
          </p>

          <div className="mt-5 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50/80 to-blue-50/80 p-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">
              Digits available
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {system.symbols.split("").map((symbol) => (
                <span
                  key={symbol}
                  className="grid size-9 place-items-center rounded-xl border border-cyan-100 bg-white font-mono text-sm font-bold text-blue-800 shadow-sm"
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-6 grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-inner"
            role="tablist"
            aria-label="Counter type"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "automatic"}
              onClick={() => setActiveTab("automatic")}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "automatic"
                  ? "bg-gradient-to-r from-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-600 hover:bg-white hover:text-blue-700"
              }`}
            >
              Automatic
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "manual"}
              onClick={() => setActiveTab("manual")}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "manual"
                  ? "bg-gradient-to-r from-violet-700 to-fuchsia-600 text-white shadow-lg shadow-violet-600/25"
                  : "text-slate-600 hover:bg-white hover:text-violet-700"
              }`}
            >
              Manual
            </button>
          </div>

          {activeTab === "automatic" && (
            <section
              role="tabpanel"
              aria-label="Automatic counter"
              className="tab-panel-enter mt-5 rounded-2xl border border-blue-100 bg-gradient-to-b from-sky-50/80 to-white p-4 sm:p-5"
            >
              <h3 className="mt-2 text-center text-lg font-extrabold text-blue-950">
                Automatic Counter
              </h3>

              <AnimationSpeed
                duration={animationDuration}
                onChange={setAnimationDuration}
              />

              <CounterDisplay
                count={automaticCount}
                system={system}
                duration={animationDuration}
              />

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  disabled={isPlaying}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Play
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  disabled={!isPlaying}
                  className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Pause
                </button>

                <button
                  type="button"
                  onClick={resetAutomatic}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Reset
                </button>
              </div>

              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Status: {isPlaying ? "Running" : "Paused"}
              </p>
            </section>
          )}

          {activeTab === "manual" && (
            <section
              role="tabpanel"
              aria-label="Manual counter"
              className="tab-panel-enter mt-5 rounded-2xl border border-violet-100 bg-gradient-to-b from-violet-50/80 to-white p-4 sm:p-5"
            >
              <h3 className="mt-2 text-center text-lg font-extrabold text-violet-950">
                Manual Counter
              </h3>

              <AnimationSpeed
                duration={animationDuration}
                onChange={setAnimationDuration}
              />

              <CounterDisplay
                count={manualCount}
                system={system}
                duration={animationDuration}
              />

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={previousManual}
                  disabled={manualCount === 0}
                  className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-800 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous −1
                </button>

                <button
                  type="button"
                  onClick={nextManual}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110"
                >
                  Next +1
                </button>

                <button
                  type="button"
                  onClick={resetManual}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Reset
                </button>
              </div>
            </section>
          )}
        </article>
      </section>
    </main>
    </Localized>
  );
};

export default Binary;