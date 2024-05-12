/**
 * Validate input.
 * @param condition Condition that input should pss
 * @param errMsg Given error message as return value, if input does not meet the condition
 * @returns Given error message in function parameter. If input passes condition then null will be returned
 */
export const validateInput = (
  condition: boolean,
  errMsg: string
): string | null => (condition ? null : errMsg);
