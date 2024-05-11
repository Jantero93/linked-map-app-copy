import moment from "moment";

/**
 * Creates ISO string of current utc time added with seconds from function parameter
 * @param seconds Seconds to be added to current utc time
 * @returns ISO string
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
