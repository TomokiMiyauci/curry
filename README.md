# curry

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/curry)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/curry/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/curry)](https://github.com/TomokiMiyauci/curry/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/curry/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/curry)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/curry)](https://github.com/TomokiMiyauci/curry/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/curry/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/curry/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@miyauci/curry.png?mini=true)](https://nodei.co/npm/@miyauci/curry/)

Currying and partial application utilities.

## Currying

Provides features related to currying.

> currying is the technique of translating the evaluation of a function that
> takes multiple arguments into evaluating a sequence of functions, each with a
> single argument.

### curry

[![curry:curry](https://deno.bundlejs.com/?q=https://deno.land/x/curry/mod.ts&treeshake=[{+curry+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fcurry%2Fmod.ts&treeshake=%5B%7B+curry+%7D%5D#sharing)

`curry` returns curried function.

```ts
import { curry } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;
const curriedFn = curry(fn);

curriedFn("")(0)(false);
curriedFn("", 0)(false);
curriedFn("", 0, false);
```

## Partial application

Partial application refers to the process of fixing a number of arguments to a
function, producing another function of smaller arity.

It has the following characteristics:

- The `length` property is not strict.
- The `name` property is `bound`.

### papplyLeft

[![curry:papplyLeft](https://deno.bundlejs.com/?q=https://deno.land/x/curry/mod.ts&treeshake=[{+papplyLeft+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fcurry%2Fmod.ts&treeshake=%5B%7B+papplyLeft+%7D%5D#sharing)

Create a bound function with arguments fixed from the left.

```ts
import { papplyLeft } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;

const ternary = papplyLeft(fn);
const binary = papplyLeft(fn, "");
const unary = papplyLeft(fn, "", 0);
const nullary = papplyLeft(fn, "", 0, false);
```

### papplyRight

[![curry:partialRight](https://deno.bundlejs.com/?q=https://deno.land/x/curry/mod.ts&treeshake=[{+partialRight+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fcurry%2Fmod.ts&treeshake=%5B%7B+partialRight+%7D%5D#sharing)

Create a bound function with arguments fixed from the right

```ts
import { papplyRight } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;

const binary = papplyRight(fn, false);
const unary = papplyRight(fn, false, 0);
const nullary = papplyRight(fn, false, 0, "");
```

### papplyRest

[![curry:papplyRest](https://deno.bundlejs.com/?q=https://deno.land/x/curry/mod.ts&treeshake=[{+papplyRest+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fcurry%2Fmod.ts&treeshake=%5B%7B+papplyRest+%7D%5D#sharing)

Create a bound function with fixed arguments except the first one.

```ts
import { papplyRest } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;

const binary = papplyRest(fn, 0);
const unary = papplyRest(fn, 0, false);
```

## API

See [deno doc](https://deno.land/x/curry/mod.ts) for all APIs.

## License

Copyright © 2023-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
