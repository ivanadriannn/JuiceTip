export const format_d_mm_yy = (date: Date) => {
  let datetime = new Date(date);

  let day: string | number = datetime.getDate();
  let month: string | number = datetime.getMonth() + 1;
  let year = datetime.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  let formattedDate = day + "/" + month + "/" + (year % 100);

  return formattedDate;
};

export const format_last_updated = (date: Date) => {
  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  let datetime = new Date(date);
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = datetime.getDate();
  let month = datetime.getMonth();
  let year = datetime.getFullYear();

  let monthName = monthNames[month];

  let suffix = getOrdinalSuffix(day);

  let formattedDate = monthName + " " + day + suffix + ", " + year;

  return formattedDate;
};