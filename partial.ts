// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Create a bound function with arguments fixed from the left.
 *
 * @example
 * ```ts
 * import { papplyLeft } from "https://deno.land/x/curry@$VERSION/partial.ts";
 *
 * declare const fn: (a: string, b: number, c: boolean) => void;
 *
 * const ternary = papplyLeft(fn);
 * const binary = papplyLeft(fn, "");
 * const unary = papplyLeft(fn, "", 0);
 * const nullary = papplyLeft(fn, "", 0, false);
 * ```
 */
export function papplyLeft<
  T extends readonly unknown[],
  U extends readonly unknown[],
  R,
>(
  fn: (...args: readonly [...T, ...U]) => R,
  ...args: T
): (...rest: U) => R {
  return function bound(...rest: U): R {
    return fn(...args, ...rest);
  };
}

/** Create a bound function with arguments fixed from the right
 *
 * @example
 * ```ts
 * import { papplyRight } from "https://deno.land/x/curry@$VERSION/partial.ts";
 *
 * declare const fn: (a: string, b: number, c: boolean) => void;
 *
 * const binary = papplyRight(fn, false);
 * const unary = papplyRight(fn, false, 0);
 * const nullary = papplyRight(fn, false, 0, "");
 * ```
 */
export function papplyRight<A0, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A0]) => R,
  arg0: A0,
): (...args: A) => R;
export function papplyRight<A0, A1, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
): (...args: A) => R;
export function papplyRight<A0, A1, A2, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A2, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
  arg2: A2,
): (...args: A) => R;
export function papplyRight<A0, A1, A2, A3, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A3, A2, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
  arg2: A2,
  arg3: A3,
): (...args: A) => R;
export function papplyRight<
  A0,
  A1,
  A2,
  A3,
  A4,
  A extends readonly unknown[],
  R,
>(
  fn: (...args: readonly [...A, A3, A2, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
  arg2: A2,
  arg3: A3,
  arg4: A4,
): (...args: A) => R;
export function papplyRight<AX, R>(
  fn: (...args: readonly AX[]) => R,
  ...args: AX[]
): (...args: readonly AX[]) => R;
export function papplyRight<AX, R>(
  fn: (...args: readonly AX[]) => R,
  ...args: AX[]
): (...args: readonly AX[]) => R {
  args = args.reverse();
  return function bound(...rest): R {
    return fn.apply(null, rest.concat(args));
  };
}

/** Create a bound function with fixed arguments except the first one.
 *
 * @example
 * ```ts
 * import { papplyRest } from "https://deno.land/x/curry@$VERSION/mod.ts";
 *
 * declare const fn: (a: string, b: number, c: boolean) => void;
 *
 * const binary = papplyRest(fn, 0);
 * const unary = papplyRest(fn, 0, false);
 * ```
 */
export function papplyRest<
  H,
  T extends readonly unknown[],
  U extends readonly unknown[],
  R,
>(
  fn: (...args: readonly [H, ...T, ...U]) => R,
  ...tail: T
): (head: H, ...rest: U) => R {
  return function bound(head: H, ...rest: U): R {
    return fn(head, ...tail, ...rest);
  };
}
