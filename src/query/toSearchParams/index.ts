export type TQueryInput =
  | string
  | URL
  | URLSearchParams
  | Request
  | { url: string }
  | null
  | undefined

export type TQueryOptions = {
  base?: string
}

const DEFAULT_BASE = 'http://localhost'

const isRequestLike = (input: TQueryInput): input is { url: string } => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'url' in input &&
    typeof input.url === 'string' &&
    !(input instanceof URLSearchParams) &&
    !(typeof URL !== 'undefined' && input instanceof URL) &&
    !(typeof Request !== 'undefined' && input instanceof Request)
  )
}

export const toSearchParams = (
  input?: TQueryInput,
  options?: TQueryOptions
): URLSearchParams => {
  if (input == null) {
    return new URLSearchParams()
  }

  if (input instanceof URLSearchParams) {
    return new URLSearchParams(input)
  }

  if (typeof URL !== 'undefined' && input instanceof URL) {
    return new URLSearchParams(input.searchParams)
  }

  if (typeof Request !== 'undefined' && input instanceof Request) {
    return new URL(input.url).searchParams
  }

  if (typeof input === 'string') {
    if (input.startsWith('?')) {
      return new URLSearchParams(input)
    }

    if (
      input.includes('?') ||
      input.startsWith('http://') ||
      input.startsWith('https://') ||
      input.startsWith('/')
    ) {
      const base = options?.base ?? DEFAULT_BASE
      return new URL(input, base).searchParams
    }

    return new URLSearchParams(input)
  }

  if (isRequestLike(input)) {
    const base = options?.base ?? DEFAULT_BASE
    return new URL(input.url, base).searchParams
  }

  return new URLSearchParams()
}
