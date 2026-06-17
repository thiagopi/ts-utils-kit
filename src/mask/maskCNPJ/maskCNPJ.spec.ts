import { describe, expect, test } from 'vitest'
import { maskCNPJ } from './'

describe('maskCNPJ()', () => {
  test.each([
    ['28971570000148', '28.971.570/0001-48'],
    ['12ABC34501DE35', '12.ABC.345/01DE-35'],
    [undefined, '']
  ])('should mask a numeric CNPJ: %s', (unmasked, masked) => {
    const result = maskCNPJ(unmasked)
    expect(result).toBe(masked)
  })
})
