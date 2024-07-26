export const descConvert = (value) => {
  if (value.length > 30) {
    return value.slice(0, 30) + "...";
  }
  return value;
};
