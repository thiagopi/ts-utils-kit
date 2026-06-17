import { describe, expect, test } from 'vitest'
import { maskCEP } from './'

describe('maskCEP()', () => {
  test.each([
    ['05406150', '05406-150'],
    ['01307003', '01307-003'],
    [undefined, '']
  ])('should mask a numeric CNPJ: %s', (unmasked, masked) => {
    const result = maskCEP(unmasked)
    expect(result).toBe(masked)
  })
})
