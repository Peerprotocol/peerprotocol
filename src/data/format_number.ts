export const formatNumber = (number: number) => {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 6,
  });
};
