import moment from 'moment';

/**
 * Adds to current utc time time span
 * @param timeSpan Time in seconds
 * @returns {string} Date in ISO string
 */
export const addToCurrentUtcTime = (timeSpan: number): string =>
  moment().add(timeSpan, 'seconds').toISOString();

/**
 * Converts ISO date string to Date object
 * @param dateString Date in ISO format string
 * @returns {Date} Javascript Date object
 */
export const convertIsoStringToDate = (dateString: string): Date =>
  moment(dateString).toDate();
