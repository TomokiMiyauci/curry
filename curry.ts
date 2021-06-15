// Copyright 2021-present the Curry authors. All rights reserved. MIT license.

// deno-lint-ignore-file no-explicit-any

/**
 * Alias for Any array types
 *
 * @internal
 */
type AnyArray = readonly unknown[];

/**
 * @internal
 */
type Union2Intersection<U> = (
  U extends unknown ? (arg: U) => void : never
) extends (arg: infer I) => void ? I
  : never;

/**
 * Pop types
 * @typeParams - T Any array
 * @example
 * ```ts
 * Pop<[1, 2, 3]> = [1, 2].
 * ```
 *
 * @internal
 */
type Pop<T extends AnyArray> = T extends [...infer Head, unknown] ? Head
  : T extends readonly [...infer Head, unknown] ? readonly [...Head]
  : never;

/**
 * Shift types
 * @typeParams S - Any array
 * @example
 * ```ts
 * Shift<[1], [1, 2, 3]> = [2, 3].
 * Shift<[1, 2], [1, 2, 3]> = [3].
 * ```
 *
 * @internal
 */
type Shift<S extends AnyArray, T extends AnyArray> = T extends [
  ...S,
  ...infer Rest,
] ? Rest
  : never;

/**
 * @example
 * ```ts
 * UnionFactorial<[1, 2, 3]> = [1] | [1, 2] | [1, 2, 3].
 * ```
 *
 * @internal
 */
type UnionFactorial<T extends AnyArray> = T extends readonly [] ? never
  : T | UnionFactorial<Pop<T>>;

/**
 * @example
 * ```ts
 * OverloadsByArgs<[1] | [1, 2], [1, 2, 3], 7> =
 *  | CurriedWithFixArgs<[1], [2, 3], 7>
 *  | CurriedWithFixArgs<[1, 2], [3], 7>.
 * ```
 *
 * @internal
 */
type OverloadsByArgs<
  Args extends AnyArray,
  FullArgs extends AnyArray,
  ReturnValue,
> = Args extends unknown
  ? CurriedWithFixArgs<Args, Shift<Args, FullArgs>, ReturnValue>
  : never;

/**
 * @internal
 */
type CurriedWithFixArgs<
  Args extends AnyArray,
  RestArgs extends AnyArray,
  ReturnValue,
> = (...args: Args) => Curried<RestArgs, ReturnValue>;

/**
 * Curry types
 *
 * @internal
 */
type Curried<Args extends AnyArray, ReturnValue> = Args extends [] ? ReturnValue
  : Union2Intersection<
    OverloadsByArgs<UnionFactorial<Args>, Args, ReturnValue>
  >;

/**
 * Creates a function that accepts arguments of `fn` and either invokes `fn` returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining `fn` arguments, and so on.
 *
 * @param fn - The function to curry
 * @returns The new curried function
 *
 * @remarks
 * Maximum number of arity is `19`. Beyond that, the type system will breaks.
 *
 * @example
 * ```ts
 * const replace = (from: string, to: string, val: string) => val.replace(from, to)
 * const curriedReplace = curry(replace)
 * const curriedReplace('hello', 'hi', 'hello world') // 'hi world'
 * const curriedReplace('hello')('hi', 'hello world') // 'hi world'
 * const curriedReplace('hello')('hi')('hello world') // 'hi world'
 * ```
 *
 * @beta
 */
const curry = <T extends unknown[], R>(
  fn: (...args: T) => R,
): T["length"] extends 0 ? () => R : Curried<T, R> => {
  const curried: any = (...t: T) =>
    t.length >= fn.length ? fn(...t) : curried.bind(null, ...t);

  return curried;
};

export { curry };
export type { Pop, Shift, UnionFactorial };
