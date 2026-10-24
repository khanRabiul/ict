import { useState } from "react";
import { Localized } from "../i18n";

const questions = [
  {
    question: "Which digits are used in the binary number system?",
    options: ["0 and 1", "0 through 7", "0 through 9", "A through F"],
    answer: 0,
    explanation: "Binary is base 2, so it uses only the digits 0 and 1.",
  },
  {
    question: "What is the base of the octal number system?",
    options: ["2", "8", "10", "16"],
    answer: 1,
    explanation: "Octal is base 8 and uses digits 0 through 7.",
  },
  {
    question: "In hexadecimal, what value does the digit A represent?",
    options: ["10", "11", "12", "15"],
    answer: 0,
    explanation: "Hexadecimal uses A through F for values 10 through 15.",
  },
  {
    question: "What is decimal 10 written in binary?",
    options: ["1001", "1010", "1100", "1110"],
    answer: 1,
    explanation: "10 = 8 + 2, so its binary representation is 1010.",
  },
];

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isComplete = questionIndex >= questions.length;
  const question = questions[questionIndex];
  const isCorrect = selectedOption === question?.answer;

  const submitAnswer = (event) => {
    event.preventDefault();
    if (isSubmitted) {
      setSelectedOption(null);
      setIsSubmitted(false);
      setQuestionIndex((index) => index + 1);
      return;
    }
    if (selectedOption === null) return;

    setAnswers((previousAnswers) => [
      ...previousAnswers,
      selectedOption === question.answer,
    ]);
    setIsSubmitted(true);
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsSubmitted(false);
  };

  return (
    <Localized>
    <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-violet-700">
        Quick quiz
      </p>
      <h1 className="mb-6 bg-linear-to-r from-violet-800 via-indigo-700 to-blue-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
        Number Systems Quiz
      </h1>

      <article className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.3)] sm:p-8">
        {isComplete ? (
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-indigo-700">
              Quiz complete
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              You scored {answers.filter(Boolean).length} out of {questions.length}
            </h2>
            <p className="mt-3 text-slate-600">
              {answers.filter(Boolean).length === questions.length
                ? "Excellent work! You know your number systems."
                : "Keep practicing and try the quiz again."}
            </p>
            <button
              type="button"
              onClick={restartQuiz}
              className="mt-6 rounded-xl bg-linear-to-r from-indigo-700 to-violet-700 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
            >
              Try again
            </button>
          </div>
        ) : (
          <form onSubmit={submitAnswer}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-indigo-800">
                Question {questionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                Score: {answers.filter(Boolean).length}
              </span>
            </div>
            <div
              className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={questionIndex}
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-indigo-600 to-violet-600 transition-all"
                style={{
                  width: `${(questionIndex / questions.length) * 100}%`,
                }}
              />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {question.question}
            </h2>
            <fieldset className="mt-5 space-y-3">
              <legend className="sr-only">Choose an answer</legend>
              {question.options.map((option, index) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    (isSubmitted
                      ? question.answer === index
                      : selectedOption === index)
                      ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100"
                      : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`quiz-question-${questionIndex}`}
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                    disabled={isSubmitted}
                    className="size-4 accent-indigo-700"
                  />
                  <span className="font-semibold text-slate-800">{option}</span>
                </label>
              ))}
            </fieldset>
            <button
              type="submit"
              disabled={!isSubmitted && selectedOption === null}
              className="mt-6 rounded-xl bg-linear-to-r from-indigo-700 to-violet-700 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitted
                ? questionIndex === questions.length - 1
                  ? "See results"
                  : "Next question"
                : "Check answer"}
            </button>
            {isSubmitted && (
              <p
                className={`mt-4 rounded-xl p-4 text-sm font-semibold ${
                  isCorrect
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-rose-50 text-rose-800"
                }`}
                role="status"
              >
                {isCorrect
                  ? "Correct! "
                  : `Not quite. The correct answer is ${question.options[question.answer]}. `}
                {question.explanation}
              </p>
            )}
          </form>
        )}
      </article>
    </section>
    </Localized>
  );
};

export default Quiz;
