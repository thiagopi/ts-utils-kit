import { describe, expect, it } from 'vitest'
import { jsonToCSV } from './'

describe('jsonToCSV', () => {
  const data = [
    {
      name: 'João Canabrava',
      age: 25
    },
    {
      name: 'Maria Antonieta',
      age: 22
    }
  ]
  it('should convert to CSV', () => {
    const space = jsonToCSV(data as never)
    expect(space).toMatchSnapshot()
  })
})
