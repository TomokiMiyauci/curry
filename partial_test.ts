// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { partial, partialRight } from "./partial.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  beforeEach,
  describe,
  it,
  Spy,
  spy,
} from "./_dev_deps.ts";

interface Nullabry {
  (): unknown;
}

interface Arity1 {
  (arg: string): unknown;
}

interface Arity2 {
  (arg: string, arg2: number): unknown;
}

interface Arity3 {
  (arg: string, arg2: number, arg3: boolean): unknown;
}

type Fn2Spy<T> = T extends (this: infer T, ...args: infer Args) => infer R
  ? Spy<T, Args, R>
  : unknown;

describe("partial", () => {
  describe("arity 1", function () {
    interface Context {
      fn: Fn2Spy<Arity1>;
    }
    beforeEach<Context>(function () {
      this.fn = spy((arg1: string) => arg1);
    });
    it<Context>("should pass 0 argument", function () {
      const arg = "";
      const fn = partial(this.fn);

      assertEquals(fn(arg), arg);
      assertSpyCallArgs(this.fn, 0, [arg]);
    });

    it<Context>("should pass 1 argument", function () {
      const arg = "";
      const fn = partial(this.fn, arg);

      assertEquals(fn(), arg);
      assertSpyCallArgs(this.fn, 0, [arg]);
    });
  });

  describe("arity 2", function () {
    interface Context {
      fn: Fn2Spy<Arity2>;
    }

    const arg = "";
    const arg2 = 0;

    beforeEach<Context>(function () {
      this.fn = spy((arg1: string, arg2: number): string => arg1 + arg2);
    });

    it<Context>("should pass 0 argument", function () {
      const fn = partial(this.fn);

      assertEquals(fn(arg, arg2), arg + arg2);
      assertSpyCallArgs(this.fn, 0, [arg, arg2]);
    });

    it<Context>("should pass 1 argument", function () {
      const fn = partial(this.fn, arg);

      assertEquals(fn(arg2), arg + arg2);
      assertSpyCallArgs(this.fn, 0, [arg, arg2]);
    });

    it<Context>("should pass 2 argument", function () {
      const fn = partial(this.fn, arg, arg2);

      assertEquals(fn(), arg + arg2);
      assertSpyCallArgs(this.fn, 0, [arg, arg2]);
    });
  });

  describe("arity 3", function () {
    interface Context {
      fn: Fn2Spy<Arity3>;
    }

    const arg = "";
    const arg2 = 0;
    const arg3 = false;

    beforeEach<Context>(function () {
      this.fn = spy((arg1: string, arg2: number, arg3: boolean): string =>
        arg1 + arg2 + arg3
      );
    });

    it<Context>("should pass 0 argument", function () {
      const fn = partial(this.fn);

      assertEquals(fn(arg, arg2, arg3), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });

    it<Context>("should pass 1 argument", function () {
      const fn = partial(this.fn, arg);

      assertEquals(fn(arg2, arg3), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });

    it<Context>("should pass 2 argument", function () {
      const fn = partial(this.fn, arg, arg2);

      assertEquals(fn(arg3), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });

    it<Context>("should pass 3 argument", function () {
      const fn = partial(this.fn, arg, arg2, arg3);

      assertEquals(fn(), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });
  });
});

describe("partialRight", () => {
  describe("nullary", () => {
    interface Context {
      fn: Fn2Spy<Nullabry>;
    }
    beforeEach<Context>(function () {
      this.fn = spy((): void => {});
    });

    it<Context>("should pass 0 argument", function () {
      const fn = partialRight(this.fn);

      assertEquals(fn(), undefined);
    });
  });

  describe("unary", () => {
    interface Context {
      fn: Fn2Spy<Arity1>;
    }
    beforeEach<Context>(function () {
      this.fn = spy((arg1: string): string => arg1);
    });

    const arg = "";

    it<Context>("should pass 0 argument", function () {
      const fn = partialRight(this.fn);

      assertEquals(fn(arg), arg);
      assertSpyCallArgs(this.fn, 0, [arg]);
    });

    it<Context>("should pass 1 argument", function () {
      const fn = partialRight(this.fn, arg);

      assertEquals(fn(), arg);
      assertSpyCallArgs(this.fn, 0, [arg]);
    });
  });

  describe("binary", () => {
    interface Context {
      fn: Fn2Spy<Arity2>;
    }
    beforeEach<Context>(function () {
      this.fn = spy((arg1: string, arg2: number): string => arg1 + arg2);
    });

    const arg = "";
    const arg2 = 0;

    it<Context>("should pass 1 argument", function () {
      const fn = partialRight(this.fn, arg2);

      assertEquals(fn(arg), arg + arg2);
      assertSpyCallArgs(this.fn, 0, [arg, arg2]);
    });

    it<Context>("should pass 2 argument", function () {
      const fn = partialRight(this.fn, arg2, arg);

      assertEquals(fn(), arg + arg2);
      assertSpyCallArgs(this.fn, 0, [arg, arg2]);
    });
  });

  describe("ternary", () => {
    interface Context {
      fn: Fn2Spy<Arity3>;
    }
    beforeEach<Context>(function () {
      this.fn = spy((arg1: string, arg2: number, arg3: boolean): string =>
        arg1 + arg2 + arg3
      );
    });

    const arg = "";
    const arg2 = 0;
    const arg3 = false;

    it<Context>("should pass 1 argument", function () {
      const fn = partialRight(this.fn, arg3);

      assertEquals(fn(arg, arg2), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });

    it<Context>("should pass 2 argument", function () {
      const fn = partialRight(this.fn, arg3, arg2);

      assertEquals(fn(arg), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });

    it<Context>("should pass 3 argument", function () {
      const fn = partialRight(this.fn, arg3, arg2, arg);

      assertEquals(fn(), arg + arg2 + arg3);
      assertSpyCallArgs(this.fn, 0, [arg, arg2, arg3]);
    });
  });
});
