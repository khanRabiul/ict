
const numberSystems = [
  {
    id: "decimal",
    name: "Decimal",
    base: 10,
    symbols: "0123456789",
    badge: "Digits 0–9",
    description:
      "The number system we use in everyday counting. Each digit's value depends on its position.",
    example: "345 = 3 × 100 + 4 × 10 + 5 × 1",
    placeValueDescription:
      "Each position represents a power of 10: hundreds, tens, then ones.",
  },
  {
    id: "binary",
    name: "Binary",
    base: 2,
    symbols: "01",
    badge: "Digits 0–1",
    description:
      "A base-2 number system that uses only two digits: 0 and 1.",
    example: "101 = 1 × 4 + 0 × 2 + 1 × 1",
    placeValueDescription:
      "Each position represents a power of 2: fours, twos, then ones.",
  },
  {
    id: "octal",
    name: "Octal",
    base: 8,
    symbols: "01234567",
    badge: "Base 8",
    description:
      "A number system that uses eight digits, from 0 to 7.",
    example: "345 = 3 × 64 + 4 × 8 + 5 × 1",
    placeValueDescription:
      "Each position represents a power of 8: sixty-fours, eights, then ones.",
  },
  {
    id: "hexadecimal",
    name: "Hexadecimal",
    base: 16,
    symbols: "0123456789ABCDEF",
    badge: "Digits 0–9, A–F",
    description:
      "A base-16 number system using digits 0–9 and letters A–F.",
    example: "2F = 2 × 16 + 15 × 1",
    placeValueDescription:
      "Each position represents a power of 16. The letters A–F represent values 10–15.",
  },
];
export default numberSystems