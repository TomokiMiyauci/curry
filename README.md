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

Creates a new "bound function".

It has the following characteristics:

- The `length` property is not strict.
- The `name` property is `partial`.

### partial

Partially applies function arguments.

```ts
import { partial } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;

const ternary = partial(fn);
const binary = partial(fn, "");
const unary = partial(fn, "", 0);
const nullary = partial(fn, "", 0, false);
```

### partialRight

Create right partial applied function.

```ts
import { partialRight } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;

const binary = partialRight(fn, false);
const unary = partialRight(fn, false, 0);
const nullary = partialRight(fn, false, 0, "");
```

### partialTail

Create tail partial applied function.

Tail is any argument other than the first argument.

```ts
import { partialTail } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;

const binary = partialTail(fn, 0);
const unary = partialTail(fn, 0, false);
```

## API

See [deno doc](https://deno.land/x/curry/mod.ts) for all APIs.

## License

Copyright © 2023-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
