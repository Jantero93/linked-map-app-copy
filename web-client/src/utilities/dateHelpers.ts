import moment from 'moment';

/**
 * Adds to current utc time time span
 * @param timeSpan Time in seconds
 * @returns Date in ISO string
 */
export const addToCurrentUtcTime = (timeSpan: number): string =>
  moment().add(timeSpan, 'seconds').toISOString();

/**
 * Converts ISO date string to Date object
 * @param dateString Date in ISO format string
 * @returns Javascript Date object
 */
export const convertIsoStringToDate = (dateString: string): Date =>
  moment(dateString).toDate();

/**
 * Check is given time before current UTC time
 * @param timeStamp Checked time either string that moment can parse default
 * or Javascript Date object
 * @returns true if this is before current UTC time
 */
export const isTimeBeforeCurrentUtc = (timeStamp: string | Date): boolean =>
  moment(timeStamp).isBefore(moment().utc());
