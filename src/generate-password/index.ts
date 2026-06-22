export type TGeneratePassword = {
  total?: number
  lowercase?: boolean
  uppercase?: boolean
  symbols?: boolean
  numbers?: boolean
}

export const generatePassword = ({
  total = 16,
  lowercase = true,
  uppercase,
  symbols,
  numbers
}: TGeneratePassword) => {
  return mountString({
    total,
    lowercase,
    uppercase,
    symbols,
    numbers
  })
}

const mountString = ({
  total = 16,
  lowercase = true,
  uppercase,
  symbols,
  numbers
}: TGeneratePassword) => {
  const _upper = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  const _lower = []
  for (const item of _upper) {
    _lower.push(item.toLowerCase())
  }

  const _symbols = ['!', '@', '#', '%', '&', '*']
  const _numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  let strArray: string[] = []
  //
  if (lowercase) {
    strArray = strArray.concat(_lower)
  }
  if (uppercase) {
    strArray = strArray.concat(_upper)
  }
  if (symbols) {
    strArray = strArray.concat(_symbols)
  }
  if (numbers) {
    strArray = strArray.concat(_numbers)
  }

  const guaranteed: string[] = []
  if (lowercase)
    guaranteed.push(_lower[Math.floor(Math.random() * _lower.length)])
  if (uppercase)
    guaranteed.push(_upper[Math.floor(Math.random() * _upper.length)])
  if (symbols)
    guaranteed.push(_symbols[Math.floor(Math.random() * _symbols.length)])
  if (numbers)
    guaranteed.push(_numbers[Math.floor(Math.random() * _numbers.length)])

  const remaining = total - guaranteed.length
  const extra: string[] = []
  for (let i = 0; i < remaining; i++) {
    extra.push(strArray[Math.floor(Math.random() * strArray.length)])
  }

  const result = [...guaranteed, ...extra]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result.join('')
}
