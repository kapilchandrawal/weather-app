// timeUtils.js
export function getCityDate(timezoneOffset) {
  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

  return new Date(utc + timezoneOffset * 1000);
}

export function formatUnixTime(unixTime, timezoneOffset) {
  const utc = unixTime * 1000;

  const cityTime = new Date(utc + timezoneOffset * 1000);

  return cityTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
