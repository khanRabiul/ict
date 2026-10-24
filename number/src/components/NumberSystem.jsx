
import numberSystems from "../data/numberSystems";
import Decimal from "../systems/Decimal";

const NumberSystem = () => {
  const decimalSystem = numberSystems.find(
    (system) => system.id === "decimal"
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:py-16">
      <section className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Number systems
        </p>

        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Decimal system
        </h1>

        {decimalSystem && <Decimal system={decimalSystem} />}
      </section>
    </main>
  );
};

export default NumberSystem;
