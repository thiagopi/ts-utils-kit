import { mask } from '../index'

export function maskPhoneNumber(phoneNumber?: string): string {
  if (!phoneNumber) return ''

  return mask('(##) #####-####', phoneNumber)
}
