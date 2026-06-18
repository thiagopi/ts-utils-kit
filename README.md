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

## Releasing

This repo uses GitHub Actions to publish to npm. Workflows live in [`.github/workflows/`](.github/workflows/).

### Alpha release (pull request)

Open a PR targeting `main`, then leave a comment with exactly:

```
release-alpha
```

You can also use `/release-alpha`.

Only repository owners, members, and collaborators can trigger the workflow. Fork PRs are not supported.

The [Release Alpha](.github/workflows/release-alpha.yml) workflow will:

1. Run tests and build the package from the PR head commit
2. Publish to npm with the `alpha` dist-tag
3. Post install instructions on the PR and in the Actions job summary

Alpha versions use the format `{package.json version}-alpha.pr{PR number}.{run number}` (for example, `1.0.0-alpha.pr42.3`).

Install an alpha build:

```bash
# Specific PR alpha version (shown in the PR comment)
npm install @thiagopi/ts-utils-kit@1.0.0-alpha.pr42.3

# Latest alpha tag
npm install @thiagopi/ts-utils-kit@alpha
```

### Stable release (`main`)

When changes are merged into `main`, the [Release](.github/workflows/release.yml) workflow publishes a stable version automatically.

The workflow will:

1. Bump the patch version in `package.json` if the current version is already on npm or tagged
2. Run tests, build, and publish to npm with the `latest` dist-tag
3. Commit the version bump to `main`, create a git tag, and open a GitHub release

To ship a minor or major release, bump the version in `package.json` before merging (for example, `1.0.0` → `1.1.0`). The workflow publishes that version as-is when it is not already on npm.

Install a stable release:

```bash
# Specific version
npm install @thiagopi/ts-utils-kit@1.1.0

# Latest stable tag
npm install @thiagopi/ts-utils-kit@latest
```

### GitHub setup

1. Add an npm automation token as the repository secret `NPM_TOKEN`.
2. In **Settings → Actions → General**, set workflow permissions to **Read and write permissions** so the alpha workflow can comment on PRs.
3. Merge the workflow files to `main`. Comment-triggered workflows run from the default branch.

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
