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
 * Checks is given year same or before compareTo, compareTo defaults to current year
 */
export const isYearSameOrBefore = (
  year: string,
  compareTo?: string
): boolean => {
  const inputYear = moment(year, "YYYY", true);

  const compareYear = compareTo ? moment() : moment(compareTo, "YYYY", true);

  return inputYear.isSameOrBefore(compareYear);
};

/**
 * Creates Javascript object from given string. Returns on utc time
 * If format YYYY, first day and month of year will be provided
 * @throws If format and input doesn't pass moment's strict check
 */
export const createJsDateFromString = (
  dateString: string,
  format = "YYYY-MM-DD"
): Date => {
  const parsedMoment =
    format === "YYYY"
      ? moment(dateString + "-01-02", "YYYY-MM-DD", true)
      : moment(dateString, format, true);

  if (!parsedMoment.isValid()) {
    throw new Error(
      `Moment not valid: dateString=${dateString}, format=${format}`
    );
  }

  return parsedMoment.utc().toDate();
};
