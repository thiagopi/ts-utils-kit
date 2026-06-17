import { mask } from '../index'

export function maskCPF(cpf?: string): string {
  if (!cpf) return ''

  return mask('###.###.###-##', cpf)
}
