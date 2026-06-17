import { describe, expect, test } from 'vitest'
import { maskPhoneNumber } from './'

describe('maskPhoneNumber()', () => {
  test.each([
    ['11999999999', '(11) 99999-9999'],
    ['2198741256', '(21) 98741-256'],
    [undefined, '']
  ])('should mask a CPF: %s', (unmasked, masked) => {
    const result = maskPhoneNumber(unmasked)
    expect(result).toBe(masked)
  })
})
