# @thiagopi/ts-utils-kit

TypeScript utility functions published to [GitHub Packages](https://github.com/thiagopi/ts-utils-kit/packages).

## Install

Add this to your `.npmrc` (a [GitHub token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) with `read:packages` is required):

```
@thiagopi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then install:

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

This repo uses GitHub Actions to publish to GitHub Packages. Workflows live in [`.github/workflows/`](.github/workflows/).

### Alpha release (pull request)

Open a PR targeting `main`, then leave a comment with exactly:

```
release-alpha
```

You can also use `/release-alpha`.

Only repository owners, members, and collaborators can trigger the workflow. Fork PRs are not supported.

The [Release Alpha](.github/workflows/release-alpha.yml) workflow will:

1. Run tests and build the package from the PR head commit
2. Publish to GitHub Packages with the `alpha` dist-tag
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

When changes are merged into `main`:

1. [Release](.github/workflows/release.yml) resolves the next version, runs tests, and creates a GitHub release tag (`v*.*.*`)
2. [Publish](.github/workflows/publish.yml) runs on that tag and publishes the package to GitHub Packages

The release workflow bumps the patch version when the current `package.json` version is already published (using the latest GitHub Packages version as the baseline).

`package.json` on `main` is not updated by CI so it stays compatible with branch protection. To ship a minor or major release, bump the version in a pull request before merging (for example, `1.0.0` → `1.1.0`).

Install a stable release:

```bash
npm install @thiagopi/ts-utils-kit@1.1.0
```

### GitHub setup

1. In **Settings → Actions → General**, set workflow permissions to **Read and write permissions** (needed for releases, packages, and PR comments).
2. Merge the workflow files to `main`. Comment-triggered workflows run from the default branch.
3. No npm token is required — workflows use the built-in `GITHUB_TOKEN` with `packages: write`.

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
