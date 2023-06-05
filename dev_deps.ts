// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

export { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
export const assertEqualsTypes = <T, U extends T = T>(_actual?: U): void => {};
