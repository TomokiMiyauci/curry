// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Partially applies function arguments.
 *
 * @example
 * ```ts
 * import { partial } from "https://deno.land/x/curry@$VERSION/partial.ts";
 *
 * declare const fn: (a: string, b: number, c: boolean) => void;
 *
 * const ternary = partial(fn);
 * const binary = partial(fn, "");
 * const unary = partial(fn, "", 0);
 * const nullary = partial(fn, "", 0, false);
 * ```
 */
export function partial<
  T extends readonly unknown[],
  U extends readonly unknown[],
  R,
>(
  fn: (...args: readonly [...T, ...U]) => R,
  ...args: T
): (...rest: U) => R {
  function partial(...rest: U): R {
    return fn(...args, ...rest);
  }

  return partial;
}
