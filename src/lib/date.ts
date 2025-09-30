export const convertDateToLocal = (date: Date) => {
  const d = new Date(date);
  const localDate = d.toLocaleString();
  return localDate;
};
