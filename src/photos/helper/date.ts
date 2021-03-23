export const getDate = (date: Date | number | string): Date => {
  let resultDate = undefined;

  /* console.log(
    "GET DATE",
    date.hasOwnProperty("toDate"),
    (date as any).toDate ? true : false
  );
 */
  if (date instanceof Date) return date;

  if ((date as any).toDate) {
    return (date as any).toDate();
  }

  if (typeof date === "string") {
    resultDate = new Date(date);
    if (resultDate.toString() === "Invalid Date")
      resultDate = new Date(parseInt(date));
  } else {
    resultDate = new Date(date);
  }

  if (resultDate.toString() === "Invalid Date")
    throw new Error("Bad date in PhotoDesc");

  return resultDate;
};
