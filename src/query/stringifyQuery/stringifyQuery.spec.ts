import { describe, expect, test } from 'vitest'
import { stringifyQuery } from './'

describe('stringifyQuery()', () => {
  test('stringifies primitive values', () => {
    expect(stringifyQuery({ page: 2, active: true })).toBe('page=2&active=true')
  })

  test('stringifies repeated keys from arrays', () => {
    expect(stringifyQuery({ tag: ['js', 'react'] })).toBe('tag=js&tag=react')
  })

  test('skips null and undefined values', () => {
    expect(
      stringifyQuery({
        kept: 'yes',
        removed: null,
        missing: undefined
      })
    ).toBe('kept=yes')
  })

  test('returns empty string for empty object', () => {
    expect(stringifyQuery({})).toBe('')
  })
})
