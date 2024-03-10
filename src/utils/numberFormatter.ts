export const toHHMMSS = (numberInSeconds: number) => {
  let seconds = numberInSeconds % 60;
  let minutes = Math.floor(numberInSeconds / 60) % 60;
  let hours = Math.floor(numberInSeconds / 3600) % 60;

  let secondsPrefix = seconds < 10 ? 0 : "";
  let minutesPrefix = minutes < 10 ? 0 : "";
  let hoursPrefix = hours < 10 ? 0 : "";

  return `${hoursPrefix}${hours}:${minutesPrefix}${minutes}:${secondsPrefix}${seconds}`;
};
