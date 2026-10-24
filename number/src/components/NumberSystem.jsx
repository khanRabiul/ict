
import numberSystems from "../data/numberSystems";
import Binary from "../systems/Binary";
import Decimal from "../systems/Decimal";
import Hexadecimal from "../systems/Hexadecimal";
import Octal from "../systems/Octal";
import NumberConversion from "./NumberConversion";

const NumberSystem = () => {
  const decimalSystem = numberSystems.find((system) => system.id === "decimal");
  const binarySystem = numberSystems.find((system) => system.id === "binary");
  const octalSystem = numberSystems.find((system) => system.id === "octal");
  const hexadecimalSystem = numberSystems.find(
    (system) => system.id === "hexadecimal"
  );

  return (
    <>
      <NumberConversion />
      {decimalSystem && <Decimal system={decimalSystem} />}
      {octalSystem && <Octal system={octalSystem} />}
      {hexadecimalSystem && <Hexadecimal system={hexadecimalSystem} />}
      {binarySystem && <Binary system={binarySystem} />}
    </>
  );
};

export default NumberSystem;
