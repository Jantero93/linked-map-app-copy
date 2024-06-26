import { NonPrimitive, PlainObject } from "@/utilities/commonTypes";
import { ControlPanelComponents } from "@/views/mapView/componentMapping";

/**
 * Check is TypeScript's generic 'object' type really object and not e.g. array
 * @param value Any TypeScript's 'object' type
 * @returns returns truly object
 */
const isPlainObject = (value: object): value is PlainObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Convert object properties to undefined, excluding arrays
 * @param obj Plain object, not array
 * @throws Error if parameter is not plain object (e.g. array.) Parameter is type checked.
 * @returns
 */
export const mapObjectPropertiesUndefined = (obj: NonPrimitive) => {
  if (!isPlainObject(obj)) {
    throw new Error("Input must be a plain object, not an array.");
  }

  return Object.fromEntries(Object.keys(obj).map((key) => [key, undefined]));
};

export type ControlPanelComponentName =
  (typeof ControlPanelComponents)[keyof typeof ControlPanelComponents];
