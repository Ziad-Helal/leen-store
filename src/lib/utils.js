export const sortAlphabetically = (array) => {
  const sortedArray = [...array].sort((a, b) => a.localeCompare(b));
  return sortedArray;
};
