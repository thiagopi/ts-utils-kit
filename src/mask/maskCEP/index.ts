import { mask } from '../index'

export function maskCEP(cep?: string): string {
  if (!cep) return ''

  return mask('#####-###', cep)
}
