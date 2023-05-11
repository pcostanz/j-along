export const isDateWithinInterval = (
  date: string,
  start: string,
  end: string
): boolean => {
  if (!date || !start || !end) return false;

  const time = new Date(date).getTime();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (startTime >= endTime) {
    throw new Error("Start time must be earlier than end time");
  }

  return time >= startTime && time <= endTime;
};
