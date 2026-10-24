export const MAX_FRACTION_DIGITS = 16;

export function parseNumber(value, system) {
  const normalizedValue = value.trim().toUpperCase();
  const decimalPointIndex = normalizedValue.indexOf(".");

  if (
    decimalPointIndex !== normalizedValue.lastIndexOf(".") ||
    normalizedValue.endsWith(".")
  ) {
    return null;
  }

  const [wholeText = "", fractionalText = ""] =
    normalizedValue.split(".");
  if (!wholeText && !fractionalText) return null;

  const wholeDigits = wholeText || "0";
  const digits = `${wholeDigits}${fractionalText}`;
  if ([...digits].some((symbol) => !system.symbols.includes(symbol))) {
    return null;
  }

  const base = BigInt(system.base);
  const denominator = base ** BigInt(fractionalText.length);
  let wholeValue = 0n;
  let fractionalValue = 0n;

  for (const symbol of wholeDigits) {
    wholeValue =
      wholeValue * base + BigInt(system.symbols.indexOf(symbol));
  }
  for (const symbol of fractionalText) {
    fractionalValue =
      fractionalValue * base + BigInt(system.symbols.indexOf(symbol));
  }

  return {
    numerator: wholeValue * denominator + fractionalValue,
    denominator,
    wholeDigits,
    fractionalText,
  };
}

export function areEquivalentNumbers(first, second, system) {
  const firstValue = parseNumber(first, system);
  const secondValue = parseNumber(second, system);

  return Boolean(
    firstValue &&
      secondValue &&
      firstValue.numerator * secondValue.denominator ===
        secondValue.numerator * firstValue.denominator
  );
}

export function getPlaceValueExpansion(value, system) {
  const { wholeDigits, fractionalText } = value;
  const digits = [
    ...wholeDigits.split("").map((symbol, index) => ({
      symbol,
      place: wholeDigits.length - index - 1,
    })),
    ...fractionalText.split("").map((symbol, index) => ({
      symbol,
      place: -(index + 1),
    })),
  ];

  return digits.map(({ symbol, place }) => ({
    symbol,
    digitValue: system.symbols.indexOf(symbol),
    place,
  }));
}

function formatDecimalRational(numerator, denominator) {
  const wholeValue = numerator / denominator;
  let remainder = numerator % denominator;
  let fractionalValue = "";

  while (remainder > 0n && fractionalValue.length < 128) {
    remainder *= 10n;
    fractionalValue += (remainder / denominator).toString();
    remainder %= denominator;
  }

  if (remainder > 0n) {
    throw new Error("Could not represent the fraction as a finite decimal.");
  }

  if (!fractionalValue) return wholeValue.toString();
  const wholeText = wholeValue === 0n ? "" : wholeValue.toString();
  return `${wholeText}.${fractionalValue}`;
}

export function convertRational(value, system) {
  const base = BigInt(system.base);
  const wholeValue = value.numerator / value.denominator;
  let remainder = value.numerator % value.denominator;
  let quotient = wholeValue;
  const integerDivisionSteps = [];

  if (system.base !== 10) {
    while (quotient > 0n) {
      const nextQuotient = quotient / base;
      const remainderDigit = quotient % base;
      integerDivisionSteps.push({
        dividend: quotient,
        quotient: nextQuotient,
        remainder: system.symbols[Number(remainderDigit)],
      });
      quotient = nextQuotient;
    }
  }

  const integerOutput = wholeValue.toString(system.base).toUpperCase();
  let fractionalOutput = "";
  const fractionalMultiplicationSteps = [];

  for (
    let index = 0;
    remainder > 0n && index < MAX_FRACTION_DIGITS;
    index += 1
  ) {
    const startingRemainder = remainder;
    const product = startingRemainder * base;
    const digit = product / value.denominator;
    remainder = product % value.denominator;
    fractionalOutput += system.symbols[Number(digit)];
    fractionalMultiplicationSteps.push({
      fraction: formatDecimalRational(
        startingRemainder,
        value.denominator
      ),
      product: formatDecimalRational(product, value.denominator),
      digit: system.symbols[Number(digit)],
      nextFraction: formatDecimalRational(remainder, value.denominator),
    });
  }

  return {
    value: fractionalOutput
      ? `${integerOutput}.${fractionalOutput}`
      : integerOutput,
    isTruncated: remainder > 0n,
    integerDivisionSteps,
    fractionalMultiplicationSteps,
  };
}
