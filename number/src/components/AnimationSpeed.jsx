const DURATIONS = [500, 1000, 2000, 3000, 4000, 5000, 10000];

const AnimationSpeed = ({ duration, onChange }) => (
  <fieldset className="mt-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 p-4">
    <legend className="px-1 text-xs font-bold uppercase tracking-[0.14em] text-indigo-800">
      Rolling animation duration
    </legend>
    <div className="mt-2 flex flex-wrap gap-2">
      {DURATIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={duration === option}
          onClick={() => onChange(option)}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            duration === option
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
              : "border border-indigo-100 bg-white text-indigo-800 hover:bg-indigo-100"
          }`}
        >
          {option / 1000}s
        </button>
      ))}
    </div>
  </fieldset>
);

export default AnimationSpeed;
