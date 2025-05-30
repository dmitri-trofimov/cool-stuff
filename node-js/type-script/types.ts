/**
 * Flattens a composite type (union or intersection) into a single, non-composite type.
 * This is useful for simplifying complex types and improving type hints in IDEs.
 *
 * @template T The composite type to flatten.
 */
export type FlattenComposite<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * Makes the specified properties of a type optional.
 *
 * @template T The original type.
 * @template K The union of keys to make optional.
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extracts the element type of an array.
 *
 * @template TArray - The array type.  If `TArray` is not an array type, the resulting type will be `never`.
 *
 * @example
 * ```typescript
 * type StringElementType = ArrayElement<string[]>;           // Type: string
 * type NumberElementType = ArrayElement<number[]>;           // Type: number
 * type MixedElementType = ArrayElement<(string | number)[]>; // Type: string | number
 * type NotAnArray = ArrayElement<number>;                    // Type: never
 * ```
 */
export type ArrayElement<TArray> = TArray extends Array<infer U> ? U : never;

/**
 * Recursively expands all properties of a type to their full type definition.
 * This is useful for making complex types more readable in IDE tooltips.
 *
 * @template T - The type to expand
 * @returns The expanded type with all properties fully resolved
 *
 * @example
 * type Nested = { a: { b: string } }
 * type Expanded = DeepExpand<Nested> // { a: { b: string } }
 */
export type DeepExpand<T> = T extends unknown ? (T extends object ? { [K in keyof T]: DeepExpand<T[K]> } : T) : never;

/**
 * Recursively removes properties that are of type 'never' from an object type.
 * This is useful for cleaning up types after conditional operations.
 *
 * @template T - The type to clean
 * @returns The type with all 'never' properties removed
 *
 * @example
 * type WithNever = { a: string; b: never; c: { d: never } }
 * type Cleaned = DeepOmitNever<WithNever> // { a: string; c: {} }
 */
export type DeepOmitNever<T> = T extends object
  ? {
      [K in keyof T as T[K] extends never ? never : K]: DeepOmitNever<T[K]>;
    }
  : T;

/**
 * Combines DeepExpand and DeepOmitNever to create a fully expanded type
 * with all 'never' properties removed. This is useful for creating clean,
 * readable type definitions from complex conditional types.
 *
 * @template T - The type to expand and clean
 * @returns The expanded and cleaned type
 *
 * @example
 * type Complex = { a: never; b: { c: string } }
 * type Expanded = Expand<Complex> // { b: { c: string } }
 */
export type Expand<T> = DeepOmitNever<DeepExpand<T>>;
