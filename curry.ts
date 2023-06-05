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
 *
 * @internal
 */
type Pop<T extends AnyArray> = T extends [...infer Head, unknown] ? Head
  : T extends readonly [...infer Head, unknown] ? readonly [...Head]
  : never;

/**
 * Shift types
 * @typeParams S - Any array
 *
 * @internal
 */
type Shift<S extends AnyArray, T extends AnyArray> = T extends [
  ...S,
  ...infer Rest,
] ? Rest
  : never;

/**
 * @internal
 */
type UnionFactorial<T extends AnyArray> = T extends readonly [] ? never
  : T | UnionFactorial<Pop<T>>;

/**
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
 * Return curried function.
 *
 * @param fn - The function to curry
 * @returns The new curried function
 *
 * @remarks
 * Maximum number of arity is `19`. Beyond that, the type system will breaks.
 *
 * @example
 * ```ts
 * import { curry } from "https://deno.land/x/curry@$VERSION/mod.ts";
 * const replace = (from: string, to: string, val: string) => val.replace(from, to)
 * const curriedReplace = curry(replace)
 * curriedReplace('hello', 'hi', 'hello world') // 'hi world'
 * curriedReplace('hello')('hi', 'hello world') // 'hi world'
 * curriedReplace('hello')('hi')('hello world') // 'hi world'
 * ```
 */
const curry = <T extends unknown[], R>(
  fn: (...args: T) => R,
): T["length"] extends 0 ? () => R : Curried<T, R> => {
  const curried: any = (...t: T) =>
    t.length >= fn.length ? fn(...t) : curried.bind(null, ...t);

  return curried;
};

export { curry };
export type { Pop, Shift, Union2Intersection, UnionFactorial };
