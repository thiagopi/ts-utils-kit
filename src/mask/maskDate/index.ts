import { mask } from '../index'

const DEFAULT_LOCALE = 'pt-BR'

export function maskDate(
  date?: string,
  locale: Intl.LocalesArgument = DEFAULT_LOCALE
): string {
  if (!date) return ''

  switch (locale) {
    case 'pt-BR':
      return mask('##/##/####', date)

    default:
      return mask('####-##-##', date)
  }
}
