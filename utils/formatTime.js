const formatTime = function (sec) {
  const date = new Date(sec * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getSeconds();
  // return `${minutes}:${secondsFormatted}`;

  if (hours == "0") {
    return `${minutes.toString().padStart(2, "0")}min ${seconds
      .toString()
      .padStart(2, "0")}seconds`;
  }
  // const timeString =
  //   hours.toString().padStart(2, "0") +
  //   ":" +
  //   minutes.toString().padStart(2, "0") +
  //   ":" +
  //   seconds.toString().padStart(2, "0");
  return `${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}min`;
};
export default formatTime;
