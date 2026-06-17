---
name: export-helper
description: >-
  Add new helpers to @thiagopi/ts-utils-kit and export them from the package
  entry. Use when adding utilities, helpers, mask functions, or any new public
  API to this repo, or when the user asks to export a helper from ts-utils-kit.
---

# Export Helper

Add utilities to `@thiagopi/ts-utils-kit` and expose them from the package root.

## Quick checklist

```
- [ ] Implement helper under src/
- [ ] Add tests (*.test.ts or *.spec.ts)
- [ ] Export from group index (if applicable)
- [ ] Export from src/index.ts
- [ ] Run npm run build && npm test
```

## Choose a layout

### Standalone helper

Use for a single utility with no related siblings.

```
src/<helper-name>/
  index.ts
  <helper-name>.test.ts   # or .spec.ts
```

Example: `src/generate-password/`

### Grouped helpers

Use for a family of related utilities that share logic.

```
src/<group>/
  index.ts                # core functions + re-exports
  <helper-name>/
    index.ts
    <helper-name>.spec.ts
```

Example: `src/mask/` with `maskCPF`, `maskCNPJ`, etc.

Group sub-helpers may import shared logic from the group `index.ts` (e.g. `import { mask } from '../index'`).

## Implementation rules

1. **No runtime dependencies** unless explicitly added to `package.json`.
2. **Keep helpers pure** — no Node/browser globals unless the helper requires them.
3. **Export types** with a `T` prefix: `TGeneratePassword`, `TOptions`, etc.
4. **Use `.js` extensions** in TypeScript import/export paths (ESM + tsup):

```ts
export { myHelper, type TMyHelper } from "./my-helper/index.js";
```

5. **Prefer explicit exports** in `src/index.ts` over `export *` so the public API stays visible.

## Export from group index

When adding a sub-helper inside a group, re-export it from the group barrel:

```ts
// src/mask/index.ts
export * from './maskCPF/'
export * from './myNewMask/'
```

## Export from package entry

Add named exports to `src/index.ts`:

```ts
export {
  generatePassword,
  type TGeneratePassword,
} from "./generate-password/index.js";

export {
  mask,
  maskCPF,
  myNewHelper,
} from "./mask/index.js";
```

For a new standalone group, add a new export block:

```ts
export {
  myHelper,
  type TMyHelper,
} from "./my-group/index.js";
```

Consumers import from the package root:

```ts
import { maskCPF, generatePassword } from "@thiagopi/ts-utils-kit";
```

## Tests

- Place tests next to the helper they cover.
- Vitest picks up `src/**/*.test.ts` and `src/**/*.spec.ts`.
- Cover edge cases: `undefined`/empty input, expected output, and locale/options when relevant.
- Use `test.each` for table-driven cases when there are multiple input/output pairs.

## Verify before finishing

```bash
npm run build
npm test
```

Build must produce updated `dist/index.d.ts` with the new exports. Do not edit `dist/` by hand.

## Do not change unless asked

- `package.json` exports map (single `"."` entry is intentional)
- `tsup.config.ts` entry point (`src/index.ts`)
- Published `files` list

## Examples

See [examples.md](examples.md) for copy-paste templates.
