export const dateFormat = (date) => {
  return new Date(date)
    .toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .split("/")
    .join(".");
};
