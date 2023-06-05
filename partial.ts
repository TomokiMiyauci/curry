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
  return function bound(...rest: U): R {
    return fn(...args, ...rest);
  };
}

/** Create right partial applied function.
 *
 * @example
 * ```ts
 * import { partialRight } from "https://deno.land/x/curry@$VERSION/partial.ts";
 *
 * declare const fn: (a: string, b: number, c: boolean) => void;
 *
 * const binary = partialRight(fn, false);
 * const unary = partialRight(fn, false, 0);
 * const nullary = partialRight(fn, false, 0, "");
 * ```
 */
export function partialRight<A0, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A0]) => R,
  arg0: A0,
): (...args: A) => R;
export function partialRight<A0, A1, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
): (...args: A) => R;
export function partialRight<A0, A1, A2, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A2, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
  arg2: A2,
): (...args: A) => R;
export function partialRight<A0, A1, A2, A3, A extends readonly unknown[], R>(
  fn: (...args: readonly [...A, A3, A2, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
  arg2: A2,
  arg3: A3,
): (...args: A) => R;
export function partialRight<
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
export function partialRight<AX, R>(
  fn: (...args: readonly AX[]) => R,
  ...args: AX[]
): (...args: readonly AX[]) => R;
export function partialRight<AX, R>(
  fn: (...args: readonly AX[]) => R,
  ...args: AX[]
): (...args: readonly AX[]) => R {
  args = args.reverse();
  return function bound(...rest): R {
    return fn.apply(null, rest.concat(args));
  };
}

/** Create tail partial applied function.
 *
 * Tail is any argument other than the first argument.
 *
 * @example
 * ```ts
 * import { partialTail } from "https://deno.land/x/curry@$VERSION/mod.ts";
 *
 * declare const fn: (a: string, b: number, c: boolean) => void;
 *
 * const binary = partialTail(fn, 0);
 * const unary = partialTail(fn, 0, false);
 * ```
 */
export function partialTail<
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
