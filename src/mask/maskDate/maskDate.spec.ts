import { describe, expect, test } from 'vitest'
import { maskDate } from './'

describe('maskDate()', () => {
  test.each([
    ['30011981', '30/01/1981'],
    ['20052000', '20/05/2000'],
    [undefined, '']
  ])('should mask a date: %s', (date, masked) => {
    const result = maskDate(date)
    expect(result).toBe(masked)
  })
})
