export type TQueryStringifyValue =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined

export type TQueryStringifyRecord = Record<string, TQueryStringifyValue>

export const stringifyQuery = (params: TQueryStringifyRecord): string => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === null || item === undefined) {
          continue
        }
        searchParams.append(key, String(item))
      }
      continue
    }

    searchParams.set(key, String(value))
  }

  return searchParams.toString()
}
