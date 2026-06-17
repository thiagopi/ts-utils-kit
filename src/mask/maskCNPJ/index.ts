import { mask } from '../index'

export function maskCNPJ(cnpj?: string): string {
  if (!cnpj) return ''

  return mask('##.###.###/####-##', cnpj, {
    options: { isCNPJ: true }
  })
}
