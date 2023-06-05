# curry

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/curry)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/curry/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/curry)](https://github.com/TomokiMiyauci/curry/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/curry/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/curry)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/curry)](https://github.com/TomokiMiyauci/curry/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/curry/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/curry/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/curry.png?mini=true)](https://nodei.co/npm/curry/)

Currying and partial application utilities.

## currying

`curry` returns curried function.

```ts
import { curry } from "https://deno.land/x/curry@$VERSION/mod.ts";

declare const fn: (a: string, b: number, c: boolean) => void;
const curriedFn = curry(fn);

curriedFn("")(0)(false);
curriedFn("", 0)(false);
curriedFn("", 0, false);
```

## API

See [deno doc](https://deno.land/x/curry/mod.ts) for all APIs.

## License

Copyright © 2023-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
