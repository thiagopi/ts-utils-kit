import { describe, expect, test } from 'vitest'
import { readQuery } from './'

describe('readQuery()', () => {
  test('reads values from search strings', () => {
    const query = readQuery('?userId=123&tag=js&tag=react')

    expect(query.get('userId')).toBe('123')
    expect(query.getAll('tag')).toEqual(['js', 'react'])
    expect(query.has('userId')).toBe(true)
  })

  test('returns defaults for missing keys', () => {
    const query = readQuery('?page=2')
    expect(query.get('userId', 'guest')).toBe('guest')
    expect(query.getNumber('limit', 10)).toBe(10)
  })

  test('coerces numeric and boolean values', () => {
    const query = readQuery('?page=2&active=true&disabled=0')

    expect(query.getNumber('page')).toBe(2)
    expect(query.getBoolean('active')).toBe(true)
    expect(query.getBoolean('disabled')).toBe(false)
  })

  test('reads from HTTP request-like objects', () => {
    const query = readQuery(
      { url: '/users?page=3&active=1' },
      { base: 'http://localhost' }
    )

    expect(query.getNumber('page')).toBe(3)
    expect(query.getBoolean('active')).toBe(true)
  })

  test('reads from fetch Request instances', () => {
    const request = new Request('https://example.com/users?sort=desc')
    const query = readQuery(request)

    expect(query.get('sort')).toBe('desc')
    expect(query.toObject()).toEqual({ sort: 'desc' })
  })

  test('exposes cloned URLSearchParams', () => {
    const query = readQuery('?a=1')
    const params = query.toSearchParams()
    params.set('a', '2')
    expect(query.get('a')).toBe('1')
  })
})
