import { describe, expect, test } from 'vitest'
import { parseQuery } from './'

describe('parseQuery()', () => {
  test('parses single values as strings', () => {
    expect(parseQuery('?userId=123&page=2')).toEqual({
      userId: '123',
      page: '2'
    })
  })

  test('parses repeated keys as arrays', () => {
    expect(parseQuery('?tag=js&tag=react')).toEqual({
      tag: ['js', 'react']
    })
  })

  test('parses HTTP request objects', () => {
    expect(
      parseQuery(
        { url: '/search?q=typescript&tag=js&tag=node' },
        { base: 'http://localhost' }
      )
    ).toEqual({
      q: 'typescript',
      tag: ['js', 'node']
    })
  })

  test('parses fetch Request instances', () => {
    const request = new Request('https://example.com/users?active=true')
    expect(parseQuery(request)).toEqual({ active: 'true' })
  })

  test('returns empty object for empty input', () => {
    expect(parseQuery()).toEqual({})
    expect(parseQuery('')).toEqual({})
  })
})
