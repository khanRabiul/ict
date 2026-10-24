import { useState } from "react";
import numberSystems from "../data/numberSystems";

const NumberConversion = () => {
  const [conversionMode, setConversionMode] = useState("single");
  const [sourceId, setSourceId] = useState(numberSystems[0].id);
  const [targetId, setTargetId] = useState(numberSystems[1].id);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [hasConverted, setHasConverted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedResultIds, setExpandedResultIds] = useState([]);

  const sourceSystem = numberSystems.find((system) => system.id === sourceId);
  const targetSystem = numberSystems.find((system) => system.id === targetId);
  const normalizedInput = input.trim().toUpperCase();

  let output = "";
  let error = "";
  let decimalValue = 0n;
  let sourceExpansion = [];
  let targetDivisionSteps = [];

  if (normalizedInput && sourceSystem && targetSystem) {
    for (const symbol of normalizedInput) {
      const digitValue = sourceSystem.symbols.indexOf(symbol);

      if (digitValue < 0) {
        error = `Use only ${sourceSystem.name} digits: ${sourceSystem.symbols
          .split("")
          .join(" ")}`;
        break;
      }

      const place = normalizedInput.length - sourceExpansion.length - 1;
      const placeValue = BigInt(sourceSystem.base) ** BigInt(place);
      sourceExpansion.push({
        symbol,
        digitValue,
        place,
        placeValue,
        contribution: BigInt(digitValue) * placeValue,
      });
      decimalValue =
        decimalValue * BigInt(sourceSystem.base) + BigInt(digitValue);
    }

    if (!error) {
      output = decimalValue.toString(targetSystem.base).toUpperCase();

      if (decimalValue > 0n && targetSystem.base !== 10) {
        let quotient = decimalValue;
        const base = BigInt(targetSystem.base);

        while (quotient > 0n) {
          const remainder = quotient % base;
          const nextQuotient = quotient / base;
          targetDivisionSteps.push({
            dividend: quotient,
            quotient: nextQuotient,
            remainder: targetSystem.symbols[Number(remainder)],
          });
          quotient = nextQuotient;
        }
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDetails(false);
    const validationError = sourceSystem
      ? getInputError(normalizedInput, sourceSystem)
      : "";
    setInputError(validationError);
    setHasConverted(Boolean(normalizedInput) && !validationError);
  };

  const clearConversion = () => {
    setHasConverted(false);
    setShowDetails(false);
    setExpandedResultIds([]);
  };

  const changeConversionMode = (mode) => {
    setConversionMode(mode);
    clearConversion();
  };

  const swapSystems = () => {
    if (normalizedInput && sourceSystem && targetSystem) {
      const isValidForSource = [...normalizedInput].every((symbol) =>
        sourceSystem.symbols.includes(symbol)
      );

      if (isValidForSource) {
        let decimalValue = 0n;

        for (const symbol of normalizedInput) {
          decimalValue =
            decimalValue * BigInt(sourceSystem.base) +
            BigInt(sourceSystem.symbols.indexOf(symbol));
        }

        setInput(decimalValue.toString(targetSystem.base).toUpperCase());
      } else {
        setInput("");
      }
    }

    setSourceId(targetId);
    setTargetId(sourceId);
    setInputError("");
    clearConversion();
  };

  const getInputError = (value, system) => {
    const invalidSymbol = [...value.toUpperCase()].find(
      (symbol) => !system.symbols.includes(symbol)
    );

    return invalidSymbol
      ? `Wrong digit "${invalidSymbol}" for ${system.name}.`
      : "";
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-blue-700">
        Convert numbers
      </p>

      <h1 className="mb-6 bg-gradient-to-r from-blue-800 via-indigo-700 to-violet-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
        Number System Converter
      </h1>

      <article className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.3)] backdrop-blur-sm sm:p-8">
        <div
          className="mb-6 grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-inner"
          role="tablist"
          aria-label="Conversion mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={conversionMode === "single"}
            onClick={() => changeConversionMode("single")}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
              conversionMode === "single"
                ? "bg-gradient-to-r from-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-600/25"
                : "text-slate-600 hover:bg-white hover:text-blue-700"
            }`}
          >
            Single conversion
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={conversionMode === "multiple"}
            onClick={() => changeConversionMode("multiple")}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
              conversionMode === "multiple"
                ? "bg-gradient-to-r from-violet-700 to-fuchsia-600 text-white shadow-lg shadow-violet-600/25"
                : "text-slate-600 hover:bg-white hover:text-violet-700"
            }`}
          >
            Multiple conversions
          </button>
        </div>

        <form onSubmit={handleSubmit}>
        <div
          className={`grid items-end gap-3 ${
            conversionMode === "single"
              ? "sm:grid-cols-[1fr_auto_1fr]"
              : "sm:grid-cols-1"
          }`}
        >
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Convert from
            </span>
            <select
              value={sourceId}
              onChange={(event) => {
                const nextSourceId = event.target.value;
                setSourceId(nextSourceId);
                setInputError("");
                clearConversion();
              }}
              className="w-full rounded-xl border border-blue-100 bg-sky-50 px-4 py-3 font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            >
              {numberSystems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.name} (base {system.base})
                </option>
              ))}
            </select>
          </label>

          {conversionMode === "single" && (
            <>
              <button
                type="button"
                onClick={swapSystems}
                aria-label="Swap source and target number systems"
                title="Swap number systems"
                className="mx-auto grid size-11 place-items-center rounded-xl border border-indigo-200 bg-white text-indigo-700 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:mb-0.5"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M7 7h14l-3-3" />
                  <path d="m21 7-3 3" />
                  <path d="M17 17H3l3 3" />
                  <path d="m3 17 3-3" />
                </svg>
              </button>

              <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Convert to
            </span>
            <select
              value={targetId}
              onChange={(event) => {
                setTargetId(event.target.value);
                clearConversion();
              }}
              className="w-full rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 font-semibold text-slate-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            >
              {numberSystems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.name} (base {system.base})
                </option>
              ))}
            </select>
              </label>
            </>
          )}
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Number to convert
          </span>
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setInputError("");
              clearConversion();
            }}
            aria-invalid={Boolean(inputError || (hasConverted && error))}
            aria-describedby="number-input-hint number-input-error"
            placeholder={`Enter ${sourceSystem?.name.toLowerCase()} digits`}
            autoComplete="off"
            spellCheck="false"
            className={`w-full rounded-xl border px-4 py-3 font-mono text-lg font-semibold uppercase outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 ${
              inputError
                ? "border-rose-400 bg-rose-50 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                : "border-slate-200 bg-white text-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            }`}
          />
          <span
            id="number-input-hint"
            className={`mt-2 block text-sm italic text-teal-700 ${
              inputError ? "" : "hidden"
            }`}
          >
            Allowed digits: {sourceSystem?.symbols.split("").join(", ")}
          </span>
          <span
            id="number-input-error"
            className="mt-1 block text-sm font-medium text-rose-700"
            role="alert"
          >
            {inputError || (hasConverted ? error : "")}
          </span>
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:brightness-110"
          >
            Convert
          </button>
          {conversionMode === "single" && (
            <button
              type="button"
              onClick={() => setShowDetails((visible) => !visible)}
              disabled={!hasConverted || Boolean(error)}
              aria-expanded={hasConverted && !error && showDetails}
              className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-800 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showDetails ? "Hide details" : "How to convert"}
            </button>
          )}
        </div>

        {hasConverted && !error && conversionMode === "single" ? (
          <>
            <div
              className="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 p-4"
              aria-live="polite"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                {targetSystem?.name} output
              </p>
              <p className="mt-2 min-h-8 break-all font-mono text-2xl font-black text-emerald-900">
                {output || "—"}
              </p>
            </div>

            {showDetails && normalizedInput && sourceSystem && targetSystem && (
              <div className="mt-5 space-y-4">
                <h2 className="text-lg font-extrabold text-slate-800">
                  How it converts
                </h2>

                <section className="rounded-2xl border border-blue-100 bg-sky-50/70 p-4">
                  <h3 className="font-bold text-blue-950">
                    1. Convert {sourceSystem.name} to decimal
                  </h3>
                  <p className="mt-2 break-words font-mono text-sm text-slate-700">
                    {sourceExpansion.map(
                      ({ symbol, digitValue, place }) => (
                        <span key={`${symbol}-${place}`}>
                          {symbol}
                          {digitValue > 9 ? ` (${digitValue})` : ""} ×{" "}
                          {sourceSystem.base}^{place}
                          {place > 0 ? " + " : ""}
                        </span>
                      )
                    )}
                  </p>
                  <p className="mt-2 break-words text-sm text-slate-600">
                    {sourceExpansion
                      .map(({ contribution }) => contribution.toString())
                      .join(" + ")}{" "}
                    ={" "}
                    <strong className="font-mono text-slate-900">
                      {decimalValue.toString()}
                    </strong>
                  </p>
                </section>

                <section className="rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
                  <h3 className="font-bold text-violet-950">
                    2. Convert decimal to {targetSystem.name}
                  </h3>
                  {targetSystem.base === 10 ? (
                    <p className="mt-2 text-sm text-slate-700">
                      The decimal value is already in the target number system:{" "}
                      <strong className="font-mono">
                        {decimalValue.toString()}
                      </strong>
                      .
                    </p>
                  ) : decimalValue === 0n ? (
                    <p className="mt-2 text-sm text-slate-700">
                      Zero is represented as{" "}
                      <strong className="font-mono">0</strong> in every number
                      system.
                    </p>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-slate-600">
                        Repeatedly divide by {targetSystem.base}, then read the
                        remainders from bottom to top.
                      </p>
                      <ol className="mt-3 space-y-1 font-mono text-sm text-slate-700">
                        {targetDivisionSteps.map(
                          ({ dividend, quotient, remainder }, index) => (
                            <li key={index}>
                              {dividend.toString()} ÷ {targetSystem.base} ={" "}
                              {quotient.toString()}, remainder {remainder}
                            </li>
                          )
                        )}
                      </ol>
                      <p className="mt-3 text-sm text-slate-700">
                        Read the remainders bottom to top:{" "}
                        <strong className="font-mono">{output}</strong>
                      </p>
                    </>
                  )}
                </section>
              </div>
            )}
          </>
        ) : hasConverted && !error && conversionMode === "multiple" ? (
          <>
            <div className="mt-5 space-y-3" aria-live="polite">
              {numberSystems
                .filter((system) => system.id !== sourceId)
                .map((system) => {
                    const result = decimalValue
                      .toString(system.base)
                      .toUpperCase();
                    const isExpanded = expandedResultIds.includes(system.id);
                    const steps = [];
                    let quotient = decimalValue;
                    const base = BigInt(system.base);

                    if (system.base !== 10) {
                      while (quotient > 0n) {
                        const remainder = quotient % base;
                        const nextQuotient = quotient / base;
                        steps.push({
                          dividend: quotient,
                          quotient: nextQuotient,
                          remainder: system.symbols[Number(remainder)],
                        });
                        quotient = nextQuotient;
                      }
                    }

                    return (
                      <div
                        key={system.id}
                        className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 p-4"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                          {system.name} output
                        </p>
                        <p className="mt-2 break-all font-mono text-2xl font-black text-emerald-900">
                          {result}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedResultIds((expandedIds) =>
                              isExpanded
                                ? expandedIds.filter((id) => id !== system.id)
                                : [...expandedIds, system.id]
                            )
                          }
                          aria-expanded={isExpanded}
                          className="mt-3 rounded-lg border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50"
                        >
                          {isExpanded ? "Hide details" : "How to convert"}
                        </button>

                        {isExpanded && (
                          <div className="mt-4 space-y-3 border-t border-emerald-200 pt-4">
                            <section className="rounded-xl border border-blue-100 bg-sky-50/70 p-4">
                              <h3 className="font-bold text-blue-950">
                                1. Convert {sourceSystem.name} to decimal
                              </h3>
                              <p className="mt-2 break-words font-mono text-sm text-slate-700">
                                {sourceExpansion.map(
                                  ({ symbol, digitValue, place }) => (
                                    <span key={`${symbol}-${place}`}>
                                      {symbol}
                                      {digitValue > 9
                                        ? ` (${digitValue})`
                                        : ""}{" "}
                                      × {sourceSystem.base}^{place}
                                      {place > 0 ? " + " : ""}
                                    </span>
                                  )
                                )}
                              </p>
                              <p className="mt-2 break-words text-sm text-slate-600">
                                {sourceExpansion
                                  .map(({ contribution }) =>
                                    contribution.toString()
                                  )
                                  .join(" + ")}{" "}
                                ={" "}
                                <strong className="font-mono text-slate-900">
                                  {decimalValue.toString()}
                                </strong>
                              </p>
                            </section>

                            <section className="rounded-xl border border-violet-100 bg-violet-50/70 p-4">
                              <h3 className="font-bold text-violet-950">
                                2. Convert decimal to {system.name}
                              </h3>
                              {system.base === 10 ? (
                                <p className="mt-2 text-sm text-slate-700">
                                  The decimal value is already the target
                                  result:{" "}
                                  <strong className="font-mono">{result}</strong>.
                                </p>
                              ) : decimalValue === 0n ? (
                                <p className="mt-2 text-sm text-slate-700">
                                  Zero is represented as 0 in every number
                                  system.
                                </p>
                              ) : (
                                <>
                                  <p className="mt-2 text-sm text-slate-600">
                                    Repeatedly divide by {system.base}, then
                                    read the remainders from bottom to top.
                                  </p>
                                  <ol className="mt-3 space-y-1 font-mono text-sm text-slate-700">
                                    {steps.map(
                                      (
                                        { dividend, quotient: next, remainder },
                                        index
                                      ) => (
                                        <li key={index}>
                                          {dividend.toString()} ÷ {system.base}{" "}
                                          = {next.toString()}, remainder{" "}
                                          {remainder}
                                        </li>
                                      )
                                    )}
                                  </ol>
                                  <p className="mt-3 text-sm text-slate-700">
                                    Read the remainders bottom to top:{" "}
                                    <strong className="font-mono">
                                      {result}
                                    </strong>
                                  </p>
                                </>
                              )}
                            </section>
                          </div>
                        )}
                      </div>
                    );
                })}
            </div>
          </>
        ) : null}
        </form>
      </article>
    </section>
  );
};

export default NumberConversion;