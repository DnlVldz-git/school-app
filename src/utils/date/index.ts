import dayjs from "./dayjs";

export const getWeekRangeBasedOnDay = (day: string) => {
  const dayDate = dayjs(day);
  const dayNumber = dayDate.day();

  return {
    firstDayOfWeek: dayDate.subtract(dayNumber, "day").toISOString(),
    lastDayOfWeek: dayDate.add(7 - dayNumber, "day").toISOString(),
  };
};
