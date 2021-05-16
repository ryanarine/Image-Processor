export const convertToPercentage = (value, total) => {
  if (value === 0 && total === 0) {
    return 33;
  }
  return Math.round((value * 100) / total);
};
