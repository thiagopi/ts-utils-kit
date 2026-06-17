# @thiagopi/ts-utils-kit

TypeScript utility functions published as an NPM package.

## Install

```bash
npm install @thiagopi/ts-utils-kit
```

## Usage

```ts
import {
  generatePassword,
  mask,
  maskCEP,
  maskCNPJ,
  maskCPF,
  maskDate,
  maskPhoneNumber,
} from "@thiagopi/ts-utils-kit";

generatePassword({ total: 20, uppercase: true, numbers: true });
maskCPF("12345678901"); // "123.456.789-01"
```

## Development

```bash
npm install
npm test
npm run build
```

## Adding a new helper with Cursor

This repo includes a Cursor skill that guides adding and exporting new utilities.

**Skill:** `export-helper`  
**Location:** [`.cursor/skills/export-helper/SKILL.md`](.cursor/skills/export-helper/SKILL.md)

### How to use it

1. Open this project in Cursor.
2. Ask the agent to add a helper and reference the skill. For example:

   > Add a `maskRG` helper and export it from the package. Use the `export-helper` skill.

   Or:

   > @export-helper add a currency formatter utility

3. The agent will follow the skill workflow:
   - Create the helper under `src/`
   - Add tests (`*.test.ts` or `*.spec.ts`)
   - Export from the group barrel (if applicable) and `src/index.ts`
   - Run `npm run build && npm test`

### What the skill defines

| Topic | Convention |
|-------|------------|
| Standalone helper | `src/<name>/index.ts` |
| Grouped helpers | `src/<group>/<name>/index.ts` (e.g. `src/mask/`) |
| Types | `T` prefix (`TGeneratePassword`) |
| Imports in TS | Use `.js` extensions for ESM |
| Public API | Explicit named exports in `src/index.ts` |

For copy-paste templates, see [`.cursor/skills/export-helper/examples.md`](.cursor/skills/export-helper/examples.md).

### Manual workflow (without Cursor)

If you prefer to add helpers yourself, follow the checklist in the skill:

1. Implement the helper under `src/`
2. Add tests next to it
3. Re-export from the group `index.ts` (if part of a group like `mask`)
4. Add named exports to `src/index.ts`
5. Run `npm run build && npm test`

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run tests |
| `npm run build` | Build `dist/` for publishing |
| `npm run check` | Lint and format with Biome |

## License

MIT
