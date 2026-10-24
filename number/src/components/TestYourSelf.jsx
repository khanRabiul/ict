import { useEffect, useState } from "react";
import numberSystems from "../data/numberSystems";

function getDivisionSteps(value, system) {
  const steps = [];
  const base = BigInt(system.base);
  let quotient = value;

  if (system.base === 10 || value === 0n) return steps;

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

  return steps;
}

const TestYourSelf = () => {
  const [testMode, setTestMode] = useState("single");
  const [sourceId, setSourceId] = useState(numberSystems[0].id);
  const [targetId, setTargetId] = useState(numberSystems[1].id);
  const [sourceInput, setSourceInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [multipleAnswers, setMultipleAnswers] = useState({});
  const [multipleResults, setMultipleResults] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [expandedResultIds, setExpandedResultIds] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [feedbackIsCorrect, setFeedbackIsCorrect] = useState(false);

  useEffect(() => {
    if (!feedbackMessage) return;

    const timer = setTimeout(() => setFeedbackMessage(null), 2500);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const sourceSystem = numberSystems.find((system) => system.id === sourceId);
  const targetSystem = numberSystems.find((system) => system.id === targetId);
  const sourceNumber = sourceInput.trim().toUpperCase();
  const normalizedAnswer = answer.trim().toUpperCase();
  let sourceError = "";
  let decimalValue = 0n;

  if (sourceNumber && sourceSystem) {
    for (const symbol of sourceNumber) {
      const digitValue = sourceSystem.symbols.indexOf(symbol);
      if (digitValue < 0) {
        sourceError = `Use only ${sourceSystem.name} digits: ${sourceSystem.symbols
          .split("")
          .join(" ")}`;
        break;
      }

      decimalValue =
        decimalValue * BigInt(sourceSystem.base) + BigInt(digitValue);
    }
  }

  const correctAnswer =
    sourceNumber && !sourceError && targetSystem
      ? decimalValue.toString(targetSystem.base).toUpperCase()
      : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDetails(false);
    if (!sourceNumber || sourceError) {
      setFeedbackMessage(null);
      return;
    }

    if (testMode === "multiple") {
      const results = {};
      numberSystems
        .filter((system) => system.id !== sourceId)
        .forEach((system) => {
          const userAnswer = (multipleAnswers[system.id] || "")
            .trim()
            .toUpperCase();
          if (!userAnswer) return;
          const expectedAnswer = decimalValue
            .toString(system.base)
            .toUpperCase();
          results[system.id] = {
            isCorrect: userAnswer === expectedAnswer,
            correctAnswer: expectedAnswer,
          };
        });

      const checkedResults = Object.values(results);
      if (!checkedResults.length) {
        setMultipleResults({});
        setFeedbackMessage(null);
        return;
      }

      const allCorrect = checkedResults.every((item) => item.isCorrect);
      setMultipleResults(results);
      setResult(null);
      setExpandedResultIds([]);
      setFeedbackIsCorrect(allCorrect);
      setFeedbackMessage(
        allCorrect
          ? "Congratulations! All your submitted answers are correct."
          : "Some answers need another look. Check the results below."
      );
      return;
    }

    if (!normalizedAnswer || !correctAnswer) {
      setResult(null);
      setFeedbackMessage(null);
      return;
    }

    const isCorrect = normalizedAnswer === correctAnswer;
    setResult({
      isCorrect,
      correctAnswer,
    });
    setFeedbackIsCorrect(isCorrect);
    setFeedbackMessage(
      isCorrect
        ? "Congratulations! Your answer is correct."
        : "Not quite. Check the correct answer below."
    );
  };

  const sourceExpansion = sourceSystem
    ? [...sourceNumber].map((symbol, index) => {
        const digitValue = sourceSystem.symbols.indexOf(symbol);
        const place = sourceNumber.length - index - 1;
        const contribution =
          BigInt(digitValue) * BigInt(sourceSystem.base) ** BigInt(place);

        return { symbol, digitValue, place, contribution };
      })
    : [];
  const divisionSteps = targetSystem
    ? getDivisionSteps(decimalValue, targetSystem)
    : [];

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-violet-700">
        Practice
      </p>

      <h1 className="mb-6 bg-linear-to-r from-violet-800 via-indigo-700 to-blue-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
        Test Your Skills
      </h1>

      <article className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.3)] backdrop-blur-sm sm:p-8">
        <div
          className="mb-6 grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-inner"
          role="tablist"
          aria-label="Test mode"
        >
          {[
            { id: "single", label: "Single test" },
            { id: "multiple", label: "Multiple tests" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={testMode === tab.id}
              onClick={() => {
                setTestMode(tab.id);
                setResult(null);
                setMultipleResults({});
                setShowDetails(false);
                setExpandedResultIds([]);
                setFeedbackMessage(null);
              }}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                testMode === tab.id
                  ? "bg-linear-to-r from-violet-700 to-indigo-700 text-white shadow-lg shadow-violet-600/25"
                  : "text-slate-600 hover:bg-white hover:text-indigo-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className={`grid gap-5 ${
              testMode === "single" ? "sm:grid-cols-2" : "sm:grid-cols-1"
            }`}
          >
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Convert from
              </span>
              <select
                value={sourceId}
                onChange={(event) => {
                  setSourceId(event.target.value);
                  setSourceInput("");
                  setAnswer("");
                  setResult(null);
                  setMultipleAnswers({});
                  setMultipleResults({});
                  setShowDetails(false);
                  setExpandedResultIds([]);
                  setFeedbackMessage(null);
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

            {testMode === "single" && (
              <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Convert to
              </span>
              <select
                value={targetId}
                onChange={(event) => {
                  setTargetId(event.target.value);
                  setAnswer("");
                  setResult(null);
                  setShowDetails(false);
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
            )}
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Number to convert ({sourceSystem?.name})
            </span>
            <input
              type="text"
              value={sourceInput}
              onChange={(event) => {
                setSourceInput(event.target.value);
                setAnswer("");
                setResult(null);
                setMultipleAnswers({});
                setMultipleResults({});
                setShowDetails(false);
                setExpandedResultIds([]);
              }}
              placeholder={`Enter a ${sourceSystem?.name.toLowerCase()} number`}
              autoComplete="off"
              spellCheck="false"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-lg font-semibold uppercase text-slate-800 outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </label>

          {sourceError && (
            <p className="mt-2 text-sm font-medium text-rose-700" role="alert">
              {sourceError}
            </p>
          )}

          {testMode === "single" && <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Your answer ({targetSystem?.name})
            </span>
            <input
              type="text"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
                setResult(null);
                setShowDetails(false);
              }}
              placeholder={`Enter your ${targetSystem?.name.toLowerCase()} answer`}
              autoComplete="off"
              spellCheck="false"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-lg font-semibold uppercase text-slate-800 outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </label>}

          {testMode === "multiple" && (
            <div className="mt-5 space-y-4">
              <h2 className="text-sm font-bold text-slate-700">
                Enter a result for each other number system
              </h2>
              {numberSystems
                .filter((system) => system.id !== sourceId)
                .map((system) => (
                  <label key={system.id} className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Your {system.name} answer
                    </span>
                    <input
                      type="text"
                      value={multipleAnswers[system.id] || ""}
                      onChange={(event) => {
                        setMultipleAnswers((answers) => ({
                          ...answers,
                          [system.id]: event.target.value,
                        }));
                        setMultipleResults({});
                        setExpandedResultIds([]);
                        setFeedbackMessage(null);
                      }}
                      placeholder={`Enter ${system.name.toLowerCase()} result`}
                      autoComplete="off"
                      spellCheck="false"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-lg font-semibold uppercase text-slate-800 outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    />
                  </label>
                ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={
                !sourceNumber ||
                Boolean(sourceError) ||
                (testMode === "single"
                  ? !normalizedAnswer
                  : !numberSystems.some(
                      (system) =>
                        system.id !== sourceId &&
                        (multipleAnswers[system.id] || "").trim()
                    ))
              }
              className="rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {testMode === "single" ? "Check answer" : "Check answers"}
            </button>
          </div>
        </form>

        {testMode === "single" && result && (
          <div
            className={`mt-5 rounded-2xl border p-4 ${
              result.isCorrect
                ? "border-emerald-200 bg-emerald-50"
                : "border-rose-200 bg-rose-50"
            }`}
            role="status"
            aria-live="polite"
          >
            <p
              className={`text-lg font-extrabold ${
                result.isCorrect ? "text-emerald-800" : "text-rose-800"
              }`}
            >
              {result.isCorrect
                ? "Congratulations! Your answer is correct."
                : "Not quite. Here is the correct answer:"}
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p
                className={`font-mono text-2xl font-black ${
                  result.isCorrect ? "text-emerald-900" : "text-rose-900"
                }`}
              >
                {result.correctAnswer}
              </p>
              <button
                type="button"
                onClick={() => setShowDetails((visible) => !visible)}
                aria-expanded={showDetails}
                className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50"
              >
                {showDetails ? "Hide details" : "How to convert"}
              </button>
            </div>

            {showDetails && sourceSystem && targetSystem && (
              <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                <section className="rounded-xl border border-blue-100 bg-sky-50/80 p-4">
                  <h2 className="font-bold text-blue-950">
                    1. Convert {sourceSystem.name} to decimal
                  </h2>
                  <p className="mt-2 wrap-break-word font-mono text-sm text-slate-700">
                    {sourceExpansion.map(
                      ({ symbol, digitValue, place }, index) => (
                        <span key={`${symbol}-${index}`}>
                          {symbol}
                          {digitValue > 9 ? ` (${digitValue})` : ""} ×{" "}
                          {sourceSystem.base}^{place}
                          {place > 0 ? " + " : ""}
                        </span>
                      )
                    )}
                  </p>
                  <p className="mt-2 wrap-break-word text-sm text-slate-600">
                    {sourceExpansion
                      .map(({ contribution }) => contribution.toString())
                      .join(" + ")}{" "}
                    ={" "}
                    <strong className="font-mono text-slate-900">
                      {decimalValue.toString()}
                    </strong>
                  </p>
                </section>

                <section className="rounded-xl border border-violet-100 bg-violet-50/80 p-4">
                  <h2 className="font-bold text-violet-950">
                    2. Convert decimal to {targetSystem.name}
                  </h2>
                  {targetSystem.base === 10 ? (
                    <p className="mt-2 text-sm text-slate-700">
                      The decimal value is already the result:{" "}
                      <strong className="font-mono">{correctAnswer}</strong>.
                    </p>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-slate-600">
                        Repeatedly divide by {targetSystem.base}; read the
                        remainders from bottom to top.
                      </p>
                      <ol className="mt-3 space-y-1 font-mono text-sm text-slate-700">
                        {divisionSteps.map(
                          ({ dividend, quotient, remainder }, index) => (
                            <li key={index}>
                              {dividend.toString()} ÷ {targetSystem.base} ={" "}
                              {quotient.toString()}, remainder {remainder}
                            </li>
                          )
                        )}
                      </ol>
                      <p className="mt-3 text-sm text-slate-700">
                        Result:{" "}
                        <strong className="font-mono">{correctAnswer}</strong>
                      </p>
                    </>
                  )}
                </section>
              </div>
            )}
          </div>
        )}

        {testMode === "multiple" &&
          Object.keys(multipleResults).length > 0 && (
            <div className="mt-5 space-y-3">
              {numberSystems
                .filter((system) => multipleResults[system.id])
                .map((system) => {
                  const item = multipleResults[system.id];
                  const isExpanded = expandedResultIds.includes(system.id);
                  const steps = getDivisionSteps(decimalValue, system);

                  return (
                    <section
                      key={system.id}
                      className={`rounded-2xl border p-4 ${
                        item.isCorrect
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-rose-200 bg-rose-50"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2
                            className={`font-extrabold ${
                              item.isCorrect
                                ? "text-emerald-800"
                                : "text-rose-800"
                            }`}
                          >
                            {system.name}
                            {item.isCorrect ? " — Correct!" : " — Incorrect"}
                          </h2>
                          <p className="mt-1 font-mono text-xl font-black text-slate-900">
                            {item.isCorrect
                              ? multipleAnswers[system.id].trim().toUpperCase()
                              : item.correctAnswer}
                          </p>
                          {!item.isCorrect && (
                            <p className="mt-1 text-sm text-rose-700">
                              Your answer:{" "}
                              <span className="font-mono">
                                {multipleAnswers[system.id].trim().toUpperCase()}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedResultIds((ids) =>
                              isExpanded
                                ? ids.filter((id) => id !== system.id)
                                : [...ids, system.id]
                            )
                          }
                          aria-expanded={isExpanded}
                          className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50"
                        >
                          {isExpanded ? "Hide details" : "How to convert"}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                          <section className="rounded-xl border border-blue-100 bg-sky-50/80 p-4">
                            <h3 className="font-bold text-blue-950">
                              1. Convert {sourceSystem.name} to decimal
                            </h3>
                            <p className="mt-2 wrap-break-word font-mono text-sm text-slate-700">
                              {sourceExpansion.map(
                                ({ symbol, digitValue, place }, index) => (
                                  <span key={`${symbol}-${index}`}>
                                    {symbol}
                                    {digitValue > 9 ? ` (${digitValue})` : ""} ×{" "}
                                    {sourceSystem.base}^{place}
                                    {place > 0 ? " + " : ""}
                                  </span>
                                )
                              )}
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                              ={" "}
                              <strong className="font-mono">
                                {decimalValue.toString()}
                              </strong>
                            </p>
                          </section>
                          <section className="rounded-xl border border-violet-100 bg-violet-50/80 p-4">
                            <h3 className="font-bold text-violet-950">
                              2. Convert decimal to {system.name}
                            </h3>
                            {system.base === 10 ? (
                              <p className="mt-2 text-sm text-slate-700">
                                The decimal value is already the result:{" "}
                                <strong className="font-mono">
                                  {item.correctAnswer}
                                </strong>
                              </p>
                            ) : decimalValue === 0n ? (
                              <p className="mt-2 text-sm text-slate-700">
                                Zero is represented as 0 in every number system.
                              </p>
                            ) : (
                              <>
                                <p className="mt-2 text-sm text-slate-600">
                                  Divide repeatedly by {system.base}, then read
                                  the remainders from bottom to top.
                                </p>
                                <ol className="mt-3 space-y-1 font-mono text-sm text-slate-700">
                                  {steps.map(
                                    ({ dividend, quotient, remainder }, index) => (
                                      <li key={index}>
                                        {dividend.toString()} ÷ {system.base} ={" "}
                                        {quotient.toString()}, remainder{" "}
                                        {remainder}
                                      </li>
                                    )
                                  )}
                                </ol>
                                <p className="mt-3 text-sm text-slate-700">
                                  Result:{" "}
                                  <strong className="font-mono">
                                    {item.correctAnswer}
                                  </strong>
                                </p>
                              </>
                            )}
                          </section>
                        </div>
                      )}
                    </section>
                  );
                })}
            </div>
          )}
      </article>

      {feedbackMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-live="assertive"
          aria-label="Answer feedback"
        >
          <div
            className={`w-full max-w-sm rounded-3xl border p-6 text-center shadow-2xl ${
              feedbackIsCorrect
                ? "border-emerald-200 bg-emerald-50"
                : "border-rose-200 bg-rose-50"
            }`}
            style={{ animation: "feedback-modal-enter 300ms ease-out both" }}
          >
            <div
              className={`mx-auto mb-4 grid size-16 place-items-center rounded-full text-white shadow-lg ${
                feedbackIsCorrect
                  ? "bg-linear-to-br from-emerald-400 to-teal-600 shadow-emerald-500/30"
                  : "bg-linear-to-br from-rose-400 to-red-600 shadow-rose-500/30"
              }`}
              style={{ animation: "feedback-icon-enter 450ms 100ms both" }}
            >
              {feedbackIsCorrect ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-9"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    style={{
                      strokeDasharray: 24,
                      strokeDashoffset: 24,
                      animation: "feedback-icon-draw 400ms 350ms ease-out forwards",
                    }}
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="size-9"
                >
                  <path
                    d="m7 7 10 10M17 7 7 17"
                    style={{
                      strokeDasharray: 30,
                      strokeDashoffset: 30,
                      animation: "feedback-icon-draw 400ms 350ms ease-out forwards",
                    }}
                  />
                </svg>
              )}
            </div>
            <p
              className={`text-xl font-black ${
                feedbackIsCorrect ? "text-emerald-800" : "text-rose-800"
              }`}
            >
              {feedbackMessage}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestYourSelf;