export const timeUnitToString = (timeUnit) => {
  const value = +timeUnit;
  switch (true) {
    case value > 10:
      return value.toString();
    case value < 10:
      return `0${value}`;
    default:
      return '00';
  }
};

export const unitsToSeconds = ({ hours, minutes, seconds }) => {
  return hours * 3600 + minutes * 60 + seconds;
};

export const secondsToUnits = (seconds) => {
  const timeUnits = {};
  timeUnits.hours = Math.floor(seconds / 3600);
  timeUnits.minutes = Math.floor(seconds / 60) % 60;
  timeUnits.seconds = seconds % 60;
  return timeUnits;
};
