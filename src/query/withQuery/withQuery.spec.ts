import { describe, expect, test } from 'vitest'
import { withQuery } from './'

describe('withQuery()', () => {
  test('appends params to relative paths', () => {
    expect(withQuery('/api/users', { page: 1, tag: ['js', 'react'] })).toBe(
      '/api/users?page=1&tag=js&tag=react'
    )
  })

  test('merges params into existing query strings', () => {
    expect(withQuery('/api/users?active=true', { page: 2 })).toBe(
      '/api/users?active=true&page=2'
    )
  })

  test('replaces existing keys', () => {
    expect(withQuery('/api/users?page=1', { page: 2 })).toBe(
      '/api/users?page=2'
    )
  })

  test('builds absolute URLs', () => {
    expect(
      withQuery('https://api.example.com/users?active=true', { page: 2 })
    ).toBe('https://api.example.com/users?active=true&page=2')
  })

  test('works with fetch Request instances', () => {
    const request = new Request('https://api.example.com/users?active=true')
    expect(withQuery(request, { page: 2 })).toBe(
      'https://api.example.com/users?active=true&page=2'
    )
  })

  test('works with HTTP request-like objects', () => {
    expect(
      withQuery(
        { url: '/users?sort=asc' },
        { page: 1 },
        { base: 'http://localhost' }
      )
    ).toBe('/users?sort=asc&page=1')
  })

  test('updates search-only strings', () => {
    expect(withQuery('?a=1', { b: 2 })).toBe('?a=1&b=2')
  })

  test('removes keys when value is null or undefined', () => {
    expect(withQuery('/users?a=1&b=2', { a: null, c: 3 })).toBe(
      '/users?b=2&c=3'
    )
  })
})
