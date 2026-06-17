# Export Helper Examples

## Standalone helper

**`src/format-currency/index.ts`**

```ts
export type TFormatCurrency = {
  value: number;
  locale?: string;
  currency?: string;
};

export function formatCurrency({
  value,
  locale = "pt-BR",
  currency = "BRL",
}: TFormatCurrency): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value,
  );
}
```

**`src/format-currency/format-currency.test.ts`**

```ts
import { describe, expect, test } from "vitest";
import { formatCurrency } from ".";

describe("formatCurrency", () => {
  test("formats BRL by default", () => {
    expect(formatCurrency({ value: 10 })).toContain("10");
  });
});
```

**`src/index.ts`** (add block)

```ts
export {
  formatCurrency,
  type TFormatCurrency,
} from "./format-currency/index.js";
```

---

## Grouped sub-helper

**`src/mask/maskRG/index.ts`**

```ts
import { mask } from "../index";

export function maskRG(rg?: string): string {
  if (!rg) return "";
  return mask("##.###.###-#", rg);
}
```

**`src/mask/maskRG/maskRG.spec.ts`**

```ts
import { describe, expect, test } from "vitest";
import { maskRG } from "./";

describe("maskRG()", () => {
  test.each([
    ["123456789", "12.345.678-9"],
    [undefined, ""],
  ])("should mask RG: %s", (input, expected) => {
    expect(maskRG(input)).toBe(expected);
  });
});
```

**`src/mask/index.ts`** (add re-export)

```ts
export * from "./maskRG/";
```

**`src/index.ts`** (add to existing mask block)

```ts
export {
  // ...existing mask exports
  maskRG,
} from "./mask/index.js";
```

---

## Current public API reference

`src/index.ts` currently exports:

| Group | Exports |
|-------|---------|
| `generate-password` | `generatePassword`, `TGeneratePassword` |
| `mask` | `mask`, `clearMask`, `clearString`, `removeTrailingNonNumbers`, `maskCEP`, `maskCNPJ`, `maskCPF`, `maskDate`, `maskPhoneNumber` |
