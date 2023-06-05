// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { Pop, Shift, UnionFactorial } from "./curry.ts";
import { curry } from "./curry.ts";
import { assertEquals, assertEqualsTypes } from "./_dev_deps.ts";

const arity0 = () => true;
const arity1 = (a: unknown) => a;
const arity2 = (a: unknown, b: unknown) => [a, b];
const arity3 = (a: unknown, b: unknown, c: unknown) => [a, b, c];
const arity4 = (a: unknown, b: unknown, c: unknown, d: unknown) => [a, b, c, d];
const arity5 = (a: unknown, b: unknown, c: unknown, d: unknown, e: unknown) => [
  a,
  b,
  c,
  d,
  e,
];
const arityMax = (
  a: unknown,
  b: unknown,
  c: unknown,
  d: unknown,
  e: unknown,
  f: unknown,
  g: unknown,
  h: unknown,
  i: unknown,
  j: unknown,
  k: unknown,
  l: unknown,
  m: unknown,
  n: unknown,
  o: unknown,
  p: unknown,
  q: unknown,
  r: unknown,
  s: unknown,
  t: unknown,
) => [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t];

Deno.test("curry", () => {
  const add = curry((a: number, b: number) => a + b);

  assertEquals(add(1, 2), 3);
  assertEquals(add(1)(2), 3);

  assertEquals(curry(arity0)(), true);
  assertEquals(curry(arity1)(""), "");
  assertEquals(typeof curry(arity2)(""), "function");
  assertEquals(curry(arity2)("", 1), ["", 1]);
  assertEquals(curry(arity2)("")(1), ["", 1]);

  assertEquals(typeof curry(arity3)(""), "function");
  assertEquals(typeof curry(arity3)("")(1), "function");
  assertEquals(curry(arity3)("")(1)(false), ["", 1, false]);
  assertEquals(curry(arity3)("", 1)(false), ["", 1, false]);
  assertEquals(curry(arity3)("", 1, false), ["", 1, false]);

  assertEquals(curry(arity4)("")(1)(false)(true), ["", 1, false, true]);
  assertEquals(curry(arity4)("", 1)(false)(true), ["", 1, false, true]);
  assertEquals(curry(arity4)("", 1, false)(true), ["", 1, false, true]);
  assertEquals(curry(arity4)("", 1, false, true), ["", 1, false, true]);

  assertEquals(curry(arity5)("")(1)(false)(true)(0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("", 1)(false)(true)(0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("", 1, false)(true)(0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("", 1, false, true)(0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("", 1, false, true, 0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("")(1, false, true, 0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("")(1)(false, true, 0n), ["", 1, false, true, 0n]);
  assertEquals(curry(arity5)("")(1)(false)(true, 0n), ["", 1, false, true, 0n]);

  assertEqualsTypes<Pop<[]>, never>();
  assertEqualsTypes<Pop<readonly []>, never>();
  assertEqualsTypes<Pop<[0]>, []>();
  assertEqualsTypes<Pop<readonly [0]>, readonly []>();
  assertEqualsTypes<Pop<[0, 0]>, [0]>();
  assertEqualsTypes<Pop<readonly [0, 0]>, readonly [0]>();
  assertEqualsTypes<Pop<[[]]>, []>();

  assertEqualsTypes<Shift<[], []>, []>();
  assertEqualsTypes<Shift<[1], []>, never>();
  assertEqualsTypes<Shift<[1], [1]>, []>();
  assertEqualsTypes<Shift<[1, 2], [1]>, never>();

  assertEqualsTypes<UnionFactorial<[]>, never>();
  assertEqualsTypes<UnionFactorial<readonly []>, never>();
  assertEqualsTypes<UnionFactorial<[1]>, [1]>();
  assertEqualsTypes<UnionFactorial<readonly [1]>, readonly [1]>();
  assertEqualsTypes<UnionFactorial<[1, 2]>, [1] | [1, 2]>();
  assertEqualsTypes<
    UnionFactorial<readonly [1, 2]>,
    readonly [1] | readonly [1, 2]
  >();
  assertEqualsTypes<UnionFactorial<[1, 2, 3]>, [1] | [1, 2] | [1, 2, 3]>();

  assertEqualsTypes<() => boolean>(curry(arity0));
  assertEqualsTypes<unknown>(curry(arity1)(""));
  assertEqualsTypes<unknown[]>(curry(arity2)("")(""));
  assertEqualsTypes<unknown[]>(curry(arity2)("", ""));
  assertEqualsTypes<unknown[]>(curry(arity3)("", "", ""));
  assertEqualsTypes<unknown[]>(curry(arity3)("", "", ""));
  assertEqualsTypes<unknown[]>(curry(arity3)("")("")(""));
  assertEqualsTypes<unknown[]>(
    curry(arityMax)(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ),
  );
});
