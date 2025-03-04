export const formatNumber = (value: number) => {
  const units = ["", "K", "M", "B", "T"];

  let unitIndex = 0;
  while (value >= 1000) {
    value /= 1000;
    unitIndex++;
  }

  const fixedValue = value.toFixed(1).replace(".0", "");
  const selectedUnit = units[unitIndex];

  return `${fixedValue}${selectedUnit}`;
};
