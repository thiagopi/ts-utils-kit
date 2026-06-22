# Query helpers

Utilities for reading and building URL query strings using the native [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API.

Works in the browser, with the Fetch `Request` API, and with HTTP server handlers that expose a URL string (Express, Fastify, Node `http`, etc.).

## Import

```ts
import {
  parseQuery,
  readQuery,
  stringifyQuery,
  toSearchParams,
  withQuery,
} from '@thiagopi/ts-utils-kit'
```

## Supported inputs

All read/build helpers accept the same input shape (`TQueryInput`):

| Input | Example |
|-------|---------|
| Search string | `'?userId=123'` |
| Full URL | `'https://api.example.com/users?page=1'` |
| Relative path | `'/users?page=1'` |
| `URLSearchParams` | `new URLSearchParams('a=1')` |
| `URL` | `new URL('https://example.com?q=test')` |
| `Request` | `new Request('https://example.com?q=test')` |
| HTTP-like object | `{ url: req.url }` |

For relative paths and server request objects, pass a `base` URL when needed:

```ts
readQuery({ url: req.url }, { base: `http://${req.headers.host}` })
```

---

## `readQuery`

Returns a typed reader for day-to-day access to query values.

```ts
const q = readQuery('?userId=123&tag=js&tag=react&page=2&active=true')

q.get('userId')              // '123'
q.get('missing', 'guest')    // 'guest'
q.getAll('tag')              // ['js', 'react']
q.getNumber('page')          // 2
q.getNumber('limit', 10)     // 10 (default when missing)
q.getBoolean('active')       // true
q.has('userId')              // true
q.toObject()                 // { userId: '123', tag: ['js', 'react'], page: '2', active: 'true' }
q.toSearchParams()           // cloned URLSearchParams
```

### Boolean coercion

`getBoolean` recognizes these values:

| Value | Result |
|-------|--------|
| `'true'`, `'1'` | `true` |
| `'false'`, `'0'` | `false` |
| anything else / missing | `undefined` |

### Browser

```ts
const q = readQuery(window.location.search)
const userId = q.get('userId')
const tags = q.getAll('tag')
```

### Fetch / Edge

```ts
export default {
  fetch(request: Request) {
    const q = readQuery(request)
    const page = q.getNumber('page', 1)
  },
}
```

### HTTP server (Express-style)

```ts
app.get('/users', (req, res) => {
  const q = readQuery(
    { url: req.url },
    { base: `http://${req.headers.host}` },
  )

  const page = q.getNumber('page', 1)
  const tags = q.getAll('tag')
})
```

---

## `parseQuery`

Converts any supported input into a plain object.

- Single values stay as `string`
- Repeated keys become `string[]`

```ts
parseQuery('?userId=123&tag=js&tag=react')
// { userId: '123', tag: ['js', 'react'] }

parseQuery('?page=2')
// { page: '2' }

parseQuery(new Request('https://example.com/users?active=true'))
// { active: 'true' }
```

Useful when you need the full query as data (logging, spreading into state, passing to another function).

---

## `stringifyQuery`

Builds a query string from an object. Arrays produce repeated keys (native behavior).

```ts
stringifyQuery({ page: 2, active: true })
// 'page=2&active=true'

stringifyQuery({ tag: ['js', 'react'] })
// 'tag=js&tag=react'

stringifyQuery({ kept: 'yes', removed: null, missing: undefined })
// 'kept=yes'
```

`null` and `undefined` values are skipped.

---

## `withQuery`

Merges params into an existing URL, path, or request. Existing keys with the same name are **replaced**.

```ts
withQuery('/api/users', { page: 1, tag: ['js', 'react'] })
// '/api/users?page=1&tag=js&tag=react'

withQuery('/api/users?active=true', { page: 2 })
// '/api/users?active=true&page=2'

withQuery('/api/users?page=1', { page: 2 })
// '/api/users?page=2'

withQuery('https://api.example.com/users?active=true', { page: 2 })
// 'https://api.example.com/users?active=true&page=2'
```

Pass `null` or `undefined` as a value to remove a key:

```ts
withQuery('/users?a=1&b=2', { a: null, c: 3 })
// '/users?b=2&c=3'
```

Search-only strings keep the leading `?`:

```ts
withQuery('?a=1', { b: 2 })
// '?a=1&b=2'
```

### Building fetch URLs

```ts
fetch(withQuery('/api/users', { page: 1, limit: 20 }))
```

### From a Request

```ts
const nextUrl = withQuery(request, { cursor: 'abc123' })
```

---

## `toSearchParams`

Low-level normalizer. Converts any supported input into a cloned `URLSearchParams` instance.

```ts
toSearchParams('?userId=123').get('userId')        // '123'
toSearchParams('/users?page=2').get('page')        // '2'
toSearchParams(request).getAll('tag')
toSearchParams({ url: req.url }, { base: origin })
```

Use this when you want to stay close to the native API but still accept flexible inputs.

---

## Types

| Type | Description |
|------|-------------|
| `TQueryInput` | All accepted input shapes |
| `TQueryOptions` | `{ base?: string }` for relative URLs |
| `TQueryReader` | Return type of `readQuery` |
| `TQueryRecord` | Output of `parseQuery` / `toObject()` |
| `TQueryValue` | `string \| string[]` |
| `TQueryStringifyRecord` | Input for `stringifyQuery` / `withQuery` |
| `TQueryStringifyValue` | `string \| number \| boolean \| string[] \| null \| undefined` |

---

## What is not supported

These helpers intentionally follow native `URLSearchParams` behavior:

- No nested objects (`?user[name]=John`)
- No bracket/index/comma array formats
- No custom encoders or decoders

For those cases, consider a dedicated library like `qs` or `query-string`.
