export type Time = {
  hours: string
  minutes: string
  seconds: string
}

export const format = (value: number): string => {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
};

export const getDate = (time: number): Time => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 60 / 60);

  return {
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
  };
};
