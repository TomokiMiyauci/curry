<p align="center">
  <img alt="logo image" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1623678089/projects/curry/logo.png" />
  <h1 align="center">curry</h1>
</p>

<p align="center">
TypeScript-first curry function without upcast
</p>

<div align="center">

[![test](https://github.com/TomokiMiyauci/curry/actions/workflows/test.yml/badge.svg)](https://github.com/TomokiMiyauci/curry/actions/workflows/test.yml)
[![GitHub release](https://img.shields.io/github/release/TomokiMiyauci/curry.svg)](https://github.com/TomokiMiyauci/curry/releases)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black)](https://deno.land/x/curry)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/curry)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/curry/mod.ts)
[![deno version](https://img.shields.io/badge/deno-^1.6.0-lightgrey?logo=deno)](https://github.com/denoland/deno)
![node support version](https://img.shields.io/badge/node-%5E6.17.0-yellow)
![npm download](https://img.shields.io/npm/dw/curry-rice?color=blue)

![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/TomokiMiyauci/curry)
[![dependencies Status](https://status.david-dm.org/gh/TomokiMiyauci/curry.svg)](https://david-dm.org/TomokiMiyauci/curry)
[![codecov](https://codecov.io/gh/TomokiMiyauci/curry/branch/main/graph/badge.svg?token=SPAi5Pv2wd)](https://codecov.io/gh/TomokiMiyauci/curry)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f43b1c317e11445399d85ce6efc06504)](https://www.codacy.com/gh/TomokiMiyauci/curry/dashboard?utm_source=github.com&utm_medium=referral&utm_content=TomokiMiyauci/curry&utm_campaign=Badge_Grade)
![npm type definitions](https://img.shields.io/npm/types/curry-rice)
![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

A curly function with a strict type definition. There is no upcast to `any`
types, respecting the typedef of the callback function.

---

## :sparkles: Features

- :zap: Multi runtime support (`Deno`, `Node.js` and Browsers)
- :books: Pure TypeScript and provides type definition
- :earth_americas: Universal module, providing `ES modules` and `Commonjs`
- :package: Optimized, super slim size
- :page_facing_up: TSDoc-style comments

### Package name

Deno: `curry` ([deno.land](https://deno.land/x/curry),
[nest.land](https://nest.land/package/curry))

Node.js: `curry-rice` ([npm](https://www.npmjs.com/package/curry-rice))

The origin of the word `curry-rice` is Rice and curry 🍛.

## :zap: Overview

### ReturnValue

```ts
const replace = (from: string, to: string, val: string) =>
  val.replace(from, to);
const curriedReplace = curry(replace);

curriedReplace("hello", "hi", "hello world"); // 'hi world'
curriedReplace("hello")("hi", "hello world"); // 'hi world'
curriedReplace("hello", "hi")("hello world"); // 'hi world'
curriedReplace("hello")("hi")("hello world"); // 'hi world'
curriedReplace("hello", "hi", "hello world"); // 'hi world'
```

### ReturnType

```ts
curriedReplace("hello"); // (to: string, val: string): string

curriedReplace("hello")("hi"); // (val: string): string
curriedReplace("hello", "hi"); // (val: string): string

curriedReplace("hello", "hi", "hello world"); // string
curriedReplace("hello")("hi")("hello world"); // string
curriedReplace("hello", "hi")("hello world"); // string
curriedReplace("hello")("hi", "hello world"); // string
```

## :dizzy: Usage

`curry` provides multi platform modules.

### 🦕 Deno

#### [deno.land](https://deno.land/x/curry)

```ts
import { curry } from "https://deno.land/x/curry/mod.ts";

curry(AnyFn);
```

#### [nest.land](https://nest.land/package/curry)

```ts
import { curry } from "https://x.nest.land/curry/mod.ts";

curry(AnyFn);
```

### :package: Node.js

> NPM package name is [`curry-rice`](https://www.npmjs.com/package/curry-rice) .

#### Install

```bash
npm i curry-rice
or
yarn add curry-rice
```

#### ES modules

```ts
import { curry } from "curry-rice";

curry(AnyFn);
```

#### Commonjs

```ts
const { curry } = require("curry-rice");

curry(AnyFn);
```

### :globe_with_meridians: Browser

The module that bundles the dependencies is obtained from
[skypack](https://www.skypack.dev/view/curry-rice).

```html
<script type="module">
  import { curry } from "https://cdn.skypack.dev/curry-rice";
  curry(AnyFn)
</script>
```

## API

### Type definition

#### curry

```ts
declare const curry: <T extends unknown[], R>(
  fn: (...args: T) => R,
) => Curried<T, R>;
```

| Parameter | Description  |
| --------- | ------------ |
| `fn`      | Any function |

`=>` The new curried function

### Example

```ts
const nullary = () => true;
curry(nullary); // ()  => boolean
const unary = (val: number) => val++;
curry(unary); // (val: number)  => number
const binaryFn = (a: number, b: number) => a + b;
curry(binaryFn); // (a: number, b: number)  => number || (a: number) => (b:number) => number
```

### Restriction

This package is focused on getting correct type inference. Hence, there are the
following limitations:

- Maximum number of [arity](https://en.wikipedia.org/wiki/Arity) is `19`.

Beyond that, the type system will breaks.

- [`Overloads function`](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
  cannot be correctly type inferred.

Overloads function is something like this:

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

For example, it has the following differences from
[`lodash.curry`](https://lodash.com/docs/4.17.15#curry).

- `lodash.curry` has a placeholder feature, which this package does not have.
- The argument of the curried function in `lodash.curry` is `any` types, but in
  this package, the type of the original argument is inferred.

Although placeholders are a useful feature, it is very difficult to implement it
while maintaining correct type inference.

If you can solve this issue, please make a
[pull request](https://github.com/TomokiMiyauci/curry/pulls).

## :green_heart: Supports

> ie is no longer supported to reduce bundle size.

The TypeScript version must be `4.1.0` or higher.

This project provides `ES modules` and `Commonjs`.

If you have an opinion about what to support, you can open an
[issue](https://github.com/TomokiMiyauci/curry/issues) to discuss it.

The `browserslist` has the following settings.

```text
defaults
last 8 version
not IE <= 11
not ie_mob <= 11
node 6
```

| <img width="30px" height="30px" alt="Deno" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/deno.svg"></br>Deno | <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `^1.6.0`                                                                                                                                | `^6.17.0`                                                                                                                                       | `^83`                                                                                                                                                | `^78`                                                                                                                                                         | `^83`                                                                                                                                                     | `^11`                                                                                                                                                     | `^12.0`                                                                                                                                                                   | `^7.2`                                                                                                                                                                          | `^68`                                                                                                                                                 |

## :handshake: Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check
[issues](https://github.com/TomokiMiyauci/curry/issues).

[Contributing guide](./.github/CONTRIBUTING.md)

## :seedling: Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/tomoki_miyauci">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## :bulb: License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
