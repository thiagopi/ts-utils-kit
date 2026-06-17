import { describe, expect, test } from 'vitest'
import { maskCPF } from './'

describe('maskCPF()', () => {
  test.each([
    ['12345678910', '123.456.789-10'],
    ['46846518484', '468.465.184-84'],
    [undefined, '']
  ])('should mask a CPF: %s', (unmasked, masked) => {
    const result = maskCPF(unmasked)
    expect(result).toBe(masked)
  })
})
