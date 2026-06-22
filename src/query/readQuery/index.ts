import { parseQuery, type TQueryRecord } from '../parseQuery/index.js'
import {
  type TQueryInput,
  type TQueryOptions,
  toSearchParams
} from '../toSearchParams/index.js'

export type TQueryReader = {
  get: (key: string, defaultValue?: string) => string | undefined
  getAll: (key: string) => string[]
  getNumber: (key: string, defaultValue?: number) => number | undefined
  getBoolean: (key: string) => boolean | undefined
  has: (key: string) => boolean
  toObject: () => TQueryRecord
  toSearchParams: () => URLSearchParams
}

export const readQuery = (
  input?: TQueryInput,
  options?: TQueryOptions
): TQueryReader => {
  const params = toSearchParams(input, options)

  return {
    get(key, defaultValue) {
      const value = params.get(key)
      if (value === null) {
        return defaultValue
      }
      return value
    },
    getAll(key) {
      return params.getAll(key)
    },
    getNumber(key, defaultValue) {
      const value = params.get(key)
      if (value === null) {
        return defaultValue
      }

      const number = Number(value)
      if (Number.isNaN(number)) {
        return defaultValue
      }

      return number
    },
    getBoolean(key) {
      const value = params.get(key)
      if (value === null) {
        return undefined
      }

      if (value === 'true' || value === '1') {
        return true
      }

      if (value === 'false' || value === '0') {
        return false
      }

      return undefined
    },
    has(key) {
      return params.has(key)
    },
    toObject() {
      return parseQuery(params)
    },
    toSearchParams() {
      return new URLSearchParams(params)
    }
  }
}
