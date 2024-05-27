/**
 * Make every property nullable in object
 * @example const person: { name: string; age: number } = { name: "John", age: 55 };
 *
 * const personNullable: Nullable<typeof person> = { name: string | null, age: number | null };
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Make property or properties nullable in object
 * @example const person: { name: string; age: number } = { name: "John", age: "55" }
 *
 * const personPartlyNullable: Nullable<typeof person, "age"> = { name: string, age: number | null}
 */
export type NullableProperty<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | null : T[P];
};

/**
 * TypeScript (and JavaScript) Primitive values. Actual values, no references.
 */
export type Primitive =
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | symbol;

/**
 * Reference values in TypeScript (and JavaScript), arrays and objects
 * (object accepts array)
 */
export type NonPrimitive<T> = Exclude<T, object>;

/**
 * Plain object (exclude e.g. array from 'object' type)
 */
export type PlainObject = { [key: string]: unknown };
