export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const convertDateToLocal = (date: Date) => {
  const localDate = date.toLocaleString();
  return localDate;
};
