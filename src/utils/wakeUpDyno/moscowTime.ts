//const offset = new Date().getTimezoneOffset() / 60;
export const getUtcHours = (hours: number, offset: number) => {
  let result = hours + offset;

  return clampHours(result);
};

export const clampHours = (hours: number) => {
  if (hours > 23) return hours - 24;

  if (hours < 0) return 24 + hours;

  return hours;
};

export const getOffsetHours = (date: Date) => {
  return date.getTimezoneOffset() / 60;
};

export const getCurrentHours = (date: Date) => {
  return date.getHours();
};

export const getMoscowHours = () => {
  const date = new Date();

  const hours = getCurrentHours(date);

  const hoursOffset = getOffsetHours(date);

  const utcHours = getUtcHours(hours, hoursOffset);

  let moscowTime = utcHours + 3;

  if (moscowTime > 23) return moscowTime - 24;

  return moscowTime;
};
