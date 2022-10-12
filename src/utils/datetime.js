export const dateStringFromNow = (timeStamp) => {
  const date = new Date(timeStamp);

  if (isToday(date)) {
    return `${date.getHours()}: ${date.getMinutes()}`;
  }

  if (isThisWeek(date)) {
    return WEEKS[date.getDay()];
  }

  const options = { year: "2-digit", month: "2-digit", day: "2-digit" };

  return date.toLocaleDateString("en-US", options);
};

export const timeForChat = (timeStamp) => {
  const date = new Date(timeStamp);

  const hours = date.getHours();

  const minutes = date.getMinutes();

  return `${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const isThisWeek = (someDate) => {
  const today = new Date();

  const monday = new Date(today.setDate(today.getDate() - today.getDay()));

  return someDate >= monday;
};

const WEEKS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
