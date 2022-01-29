export const dateStringFormatter = (date) => {
  const d = new Date(Number(date));
  const today = new Date();

  const month = "" + (d.getMonth() + 1);
  const day = "" + d.getDate();

  const Tmonth = "" + (today.getMonth() + 1);
  const Tday = "" + today.getDate();

  if ((month !== Tmonth) | (day !== Tday)) {
    return d.toLocaleDateString("cs-CZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    // return d.toLocaleDateString("cs-CZ", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    // });
  }

  const hours = "" + d.getHours();
  const minutes = "" + d.getMinutes();

  return [hours, minutes.length > 1 ? minutes : 0 + minutes].join(":");
};
