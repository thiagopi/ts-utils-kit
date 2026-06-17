import { describe, expect, test } from "vitest";
import { generatePassword } from ".";

describe("generatePassword", () => {
  test("should return the password with LENGTH 20", () => {
    const password = generatePassword({ total: 20 });
    expect(password.length).toBe(20);
  });

  test("should return the password with UPPERCASE", () => {
    const password = generatePassword({ uppercase: true });
    const regExp = /[A-Z]/;
    expect(regExp.test(password)).toBe(true);
  });

  test("should return the password with SYMBOLS", () => {
    const password = generatePassword({ symbols: true });
    const regExp = /\W/;
    expect(regExp.test(password)).toBe(true);
  });

  test("should return the password with NUMBERS", () => {
    const password = generatePassword({ numbers: true });
    const regExp = /\d/;
    expect(regExp.test(password)).toBe(true);
  });

  test("should return the password with all chars", () => {
    const password = generatePassword({
      uppercase: true,
      symbols: true,
      numbers: true,
    });

    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);
    const hasNumbers = /\d/.test(password);

    expect(hasUppercase).toBe(true);
    expect(hasSymbols).toBe(true);
    expect(hasSymbols).toBe(hasNumbers);
  });
});
