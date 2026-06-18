export const jsonToCSV = (items: never[], customHeader?: string[]) => {
  const originalHeader = Object.keys(items[0])
  const header = customHeader ?? Object.keys(items[0])

  const headerString = header.join(',')

  // handle null or undefined values here
  const replacer = (_key: unknown, value: unknown) => value ?? ''

  const rowItems = items.map((row) =>
    originalHeader
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  )

  // join header and body, and break into separate lines
  return [headerString, ...rowItems].join('\r\n')
}
