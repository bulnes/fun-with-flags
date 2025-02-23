export const formatNumber = (value: number) => {
  const units = ["", "K", "M", "B", "T"];

  let unitIndex = 0;
  while (value >= 1000) {
    value /= 1000;
    unitIndex++;
  }

  return `${value.toFixed(1)}${units[unitIndex]}`.replace(".0", "");
};

