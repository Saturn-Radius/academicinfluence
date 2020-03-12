export const formatYear = (year: number | null): string => {
  if (year === null) {
    return "";
  } else if (year < 0) {
    return `${-year} BC`;
  } else {
    return `${year} AD`;
  }
};
