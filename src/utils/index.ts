export { regex } from "./formValidators";

export const millisecondsToYears = (mSeconds: number) => {
  return Math.floor(mSeconds / 31536000000);
};

export const getLizzyYearsOld = () => {
  const birthday = new Date("2018-07-07");

  const now = new Date();

  const mSeconds = now.getTime() - birthday.getTime();

  return millisecondsToYears(mSeconds);
};

export const getYearsOld = (date: Date) => {
  const birthday = new Date("2018-07-07");

  //console.log("Date", date.getTime(), birthday.getTime());

  const mSeconds = date.getTime() - birthday.getTime();

  //console.log("mSeconds", mSeconds);

  //console.log("result", mSeconds / 31536000000);

  return millisecondsToYears(mSeconds);
};

export const getFormattedYearsOld = (yearsOld: number) => {
  switch (yearsOld) {
    case 0:
      return "Меньше года";
    case 1:
      return "1 год";
    case 2:
      return "2 года";
    case 3:
      return "3 года";
    case 4:
      return "4 года";
    case 5:
      return "5 лет";
    case 6:
      return "6 лет";
    case 7:
      return "7 лет";
    case 8:
      return "8 лет";
    case 9:
      return "9 лет";
    case 10:
      return "10 лет";
    case 11:
      return "11 лет";
    case 12:
      return "12 лет";
    case 13:
      return "13 лет";
    case 14:
      return "14 лет";
    case 15:
      return "15 лет";
    case 16:
      return "16 лет";

    default:
      throw new Error(`No implementation or bad data | ${yearsOld}`);
  }
};
