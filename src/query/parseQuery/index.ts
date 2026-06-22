import {
  type TQueryInput,
  type TQueryOptions,
  toSearchParams
} from '../toSearchParams/index.js'

export type TQueryValue = string | string[]
export type TQueryRecord = Record<string, TQueryValue>

export const parseQuery = (
  input?: TQueryInput,
  options?: TQueryOptions
): TQueryRecord => {
  const params = toSearchParams(input, options)
  const result: TQueryRecord = {}
  const seen = new Set<string>()

  for (const key of params.keys()) {
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    const values = params.getAll(key)
    result[key] = values.length === 1 ? values[0] : values
  }

  return result
}
