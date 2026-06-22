type TOptions = {
  options?: {
    isCNPJ?: boolean
  }
}

/**
 * Mask a string
 * e.g.: mask('###.###.###-##', '12345678901') => 123.456.789-01
 * @param mask - The mask pattern where '#' represents a digit placeholder
 * @param str - The input string to be masked
 * @param options
 * @returns The masked string
 */
export function mask(
  mask: string,
  str?: string,
  { options }: TOptions = {}
): string {
  if (!str) return ''
  // Remove all non-numeric characters
  const clearStr = clearString(str, { options })

  let masked = ''
  let countStr = 0

  for (let i = 0; i <= mask.length - 1; i++) {
    if (mask[i] === '#') {
      if (countStr < clearStr.length) {
        masked += clearStr[countStr++]
      }
    } else {
      if (i < mask.length) masked += mask[i]
    }
  }

  return removeTrailingNonNumbers(masked, { options })
}

/**
 * @deprecated - user clearString() instead
 *  */
export function clearMask(str: string, { options }: TOptions = {}) {
  return clearString(str, { options })
}

/**
 * Remove all non-numeric/alphanumeric characters
 *  */
export function clearString(str: string, { options }: TOptions = {}) {
  if (options?.isCNPJ) {
    const cleaned = str.replaceAll(/[^a-z0-9]/gi, '').toUpperCase()

    // Positions 1..12: alphanumeric allowed
    const head = cleaned.slice(0, 12)

    // Positions 13..14: digits only
    const digitsTail = cleaned
      .slice(12)
      .replaceAll(/[^0-9]/g, '')
      .slice(0, 2)

    return head + digitsTail
  }

  return str.replaceAll(/\D/g, '')
}

/**
 * Remove trailing non-numeric/alphanumeric characters from a masked string
 * e.g.: '123.4.-' => '123.4'
 * e.g.: '123..-' => '123'
 * e.g.: '123.456.789-' => '123.456.789'
 * e.g.: 'ABC.456.789-' => 'ABC.456.789'
 */
export function removeTrailingNonNumbers(
  str: string,
  { options }: TOptions = {}
): string {
  if (options?.isCNPJ) {
    // 1. Uses the regex `/[^a-z0-9]+$/i` to match one or more non-digit characters at the end of the string
    return str.replace(/[^a-z0-9]+$/i, '').toUpperCase()
  }

  // 1. Uses the regex `/\D+$/` to match one or more non-digit characters at the end of the string
  return str.replace(/\D+$/, '')
}

export * from './maskCEP/'
export * from './maskCNPJ'
export * from './maskCPF/'
export * from './maskDate/'
export * from './maskPhoneNumber'
