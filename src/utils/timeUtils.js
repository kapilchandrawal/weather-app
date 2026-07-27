// timeUtils.js
export function getCityDate(timezoneOffset) {
  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

  return new Date(utc + timezoneOffset * 1000);
}
