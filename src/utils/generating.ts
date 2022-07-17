export const getRandomInt = (
  min: number,
  max: number,
  withInclusive?: boolean,
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const inclusive = withInclusive ? 1 : 0;

  return Math.floor(Math.random() * (max - min + inclusive)) + min;
};
