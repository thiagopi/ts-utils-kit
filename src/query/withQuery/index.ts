import {
  stringifyQuery,
  type TQueryStringifyRecord
} from '../stringifyQuery/index.js'
import type { TQueryInput, TQueryOptions } from '../toSearchParams/index.js'

const DEFAULT_BASE = 'http://localhost'

const mergeParams = (
  target: URLSearchParams,
  params: TQueryStringifyRecord
): void => {
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      target.delete(key)
      continue
    }

    target.delete(key)

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === null || item === undefined) {
          continue
        }
        target.append(key, String(item))
      }
      continue
    }

    target.set(key, String(value))
  }
}

const isAbsoluteUrl = (value: string): boolean =>
  value.startsWith('http://') || value.startsWith('https://')

export const withQuery = (
  input: TQueryInput,
  params: TQueryStringifyRecord,
  options?: TQueryOptions
): string => {
  const base = options?.base ?? DEFAULT_BASE

  if (input == null) {
    const query = stringifyQuery(params)
    return query ? `?${query}` : ''
  }

  if (typeof input === 'string' && input.startsWith('?')) {
    const searchParams = new URLSearchParams(input)
    mergeParams(searchParams, params)
    const query = searchParams.toString()
    return query ? `?${query}` : ''
  }

  if (input instanceof URLSearchParams) {
    const searchParams = new URLSearchParams(input)
    mergeParams(searchParams, params)
    return searchParams.toString()
  }

  let urlString = ''
  let returnAbsolute = false

  if (typeof Request !== 'undefined' && input instanceof Request) {
    urlString = input.url
    returnAbsolute = isAbsoluteUrl(urlString)
  } else if (typeof URL !== 'undefined' && input instanceof URL) {
    urlString = input.href
    returnAbsolute = true
  } else if (typeof input === 'string') {
    urlString = input
    returnAbsolute = isAbsoluteUrl(input)
  } else if (
    typeof input === 'object' &&
    'url' in input &&
    typeof input.url === 'string'
  ) {
    urlString = input.url
    returnAbsolute = isAbsoluteUrl(input.url)
  }

  const url = new URL(urlString, base)
  mergeParams(url.searchParams, params)

  if (returnAbsolute) {
    return url.toString()
  }

  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ''}${url.hash}`
}
