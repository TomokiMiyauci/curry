import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@miyauci/curry",
    version,
    description: "Currying and partial application utilities",
    keywords: [
      "curry",
      "curryN",
      "currying",
      "function",
      "functional",
      "typescript",
      "ts",
      "ts-curry",
      "types",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/curry",
    bugs: "https://github.com/TomokiMiyauci/curry/issues",
    repository: {
      type: "git",
      url: "https://github.com/TomokiMiyauci/curry.git",
    },
    sideEffects: false,
    type: "module",
    publishConfig: { access: "public" },
  },
  packageManager: "pnpm",
});
