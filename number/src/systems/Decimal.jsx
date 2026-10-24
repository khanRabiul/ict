
import { useEffect, useState } from "react";

const DIGITS = "0123456789";

function RollingDigit({ value, place }) {
  const position = Math.floor(value / place);

  const digits = Array.from(
    { length: position + 11 },
    (_, index) => DIGITS[index % 10]
  );

  return (
    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-900 text-white shadow-inner">
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${position * 3}rem)`,
        }}
      >
        {digits.map((digit, index) => (
          <div
            key={index}
            className="flex h-12 items-center justify-center font-mono text-3xl font-bold"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

const Decimal = () => {
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Count upward without a preset maximum.
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setCount((previousCount) => previousCount + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [count, isPlaying]);

  // Determine the digit positions needed.
  const places = [];
  let place = 1;

  while (place <= Math.max(count, 1)) {
    places.push(place);
    place *= 10;
  }

  places.reverse();

  const formattedCount = count.toLocaleString("en-US");

  const handleReset = () => {
    setIsPlaying(false);
    setCount(0);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Number systems
        </p>

        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Decimal Counter
        </h1>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-800">
              Animated counter
            </h2>

            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
              Base 10 · Unlimited
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Watch the digits roll as the number increases.
            New digit columns appear automatically.
          </p>

          {/* Rolling number display */}
          <div
            className="my-8 flex flex-wrap items-center justify-center gap-1.5"
            role="img"
            aria-label={`Current number ${formattedCount}`}
          >
            {places.map((digitPlace) => (
              <RollingDigit
                key={digitPlace}
                value={count}
                place={digitPlace}
              />
            ))}
          </div>

          <p className="mb-2 text-center text-sm text-slate-500">
            Current number
          </p>

          <p className="mb-6 break-all text-center font-mono text-2xl font-bold text-teal-800">
            {formattedCount}
          </p>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setIsPlaying(true)}
              disabled={isPlaying}
              className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Play
            </button>

            <button
              onClick={() => setIsPlaying(false)}
              disabled={!isPlaying}
              className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Pause
            </button>

            <button
              onClick={handleReset}
              className="rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-300"
            >
              Reset
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Decimal;
