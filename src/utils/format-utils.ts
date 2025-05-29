export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
};

export const getPercentageClass = (value: number): string => {
  if (value > 0) {
    return 'positive-change';
  } else if (value < 0) {
    return 'negative-change';
  }
  return '';
};
