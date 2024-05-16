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
