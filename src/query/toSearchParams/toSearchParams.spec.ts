import { describe, expect, test } from 'vitest'
import { toSearchParams } from './'

describe('toSearchParams()', () => {
  test('returns empty params for nullish input', () => {
    expect(toSearchParams().toString()).toBe('')
    expect(toSearchParams(null).toString()).toBe('')
  })

  test('parses search strings', () => {
    const params = toSearchParams('?userId=123&tag=js')
    expect(params.get('userId')).toBe('123')
    expect(params.get('tag')).toBe('js')
  })

  test('parses full URLs', () => {
    const params = toSearchParams('https://example.com/users?page=2')
    expect(params.get('page')).toBe('2')
  })

  test('parses relative paths with default base', () => {
    const params = toSearchParams('/users?page=2')
    expect(params.get('page')).toBe('2')
  })

  test('parses request-like objects with custom base', () => {
    const params = toSearchParams(
      { url: '/users?page=2' },
      { base: 'https://api.example.com' }
    )
    expect(params.get('page')).toBe('2')
  })

  test('parses URL instances', () => {
    const params = toSearchParams(new URL('https://example.com?q=test'))
    expect(params.get('q')).toBe('test')
  })

  test('parses Request instances', () => {
    const request = new Request('https://example.com/items?sort=asc')
    const params = toSearchParams(request)
    expect(params.get('sort')).toBe('asc')
  })

  test('clones URLSearchParams input', () => {
    const original = new URLSearchParams('a=1')
    const cloned = toSearchParams(original)
    cloned.set('a', '2')
    expect(original.get('a')).toBe('1')
  })
})
