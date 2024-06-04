import moment from "moment";

/**
 * Creates ISO string of current utc time added with seconds from function parameter
 * @param seconds Seconds to be added to current utc time
 * @returns ISO string with added seconds
 */
export const utcTimeWitAddedSeconds = (seconds: number): string =>
  moment().utc().add(seconds, "seconds").toISOString();

/**
 * Checks is time before current utc time
 * @param date Date to check. Type string | Date
 * @returns True if given parameter is before current utc time
 */
export const isTimeBeforeCurrentUtc = (date: string | Date): boolean =>
  moment(date).isBefore(moment().utc());

/**
 * Checks is given time after current utc time
 * @param date ISO string or Javascript Date
 * @returns true if given parameter is after current utc time
 */
export const isTimeAfterCurrentUtc = (date: string | Date): boolean =>
  moment(date).isAfter(moment().utc());

/**
 * Get current time on JavaScript Date, current year, current hour etc. Check parametets
 * @param format
 * @returns Return current time on wanted parameter type
 */
export const getCurrentDates = (
  format?: "year" | "month" | "week" | "day" | "hour"
): number => {
  switch (format) {
    case "year":
      return moment().year();
    case "month":
      return moment().month();
    case "week":
      return moment().week();
    case "day":
      return moment().day();
    case "hour":
      return moment().hour();
    default:
      return moment().year();
  }
};

/**
 * Checks is given year same or before compareTo, compareTo defaults to current year
 */
export const isYearSameOrBefore = (year: string, compareTo?: string) => {
  const inputYear = moment(year, "YYYY", true);

  const compareYear = compareTo ? moment() : moment(compareTo, "YYYY", true);

  return inputYear.isSameOrBefore(compareYear);
};
