import { describe, expect, test } from 'vitest'
import { clearMask, mask, removeTrailingNonNumbers } from './'

describe('mask()', () => {
  describe('clearMask', () => {
    test('should clear the numeric string masked', () => {
      const result = clearMask('123.456.789-10')

      expect(result).toBe('12345678910')
    })

    test('should clear the alphanumeric string masked', () => {
      const result = clearMask('AB.456.789/CD01-10', {
        options: { isCNPJ: true }
      })

      expect(result).toBe('AB456789CD0110')
    })
  })

  describe('removeTrailingNonNumbers', () => {
    test('should remove trailing non numbers from the string', () => {
      const result = removeTrailingNonNumbers('123.456.-')

      expect(result).toBe('123.456')
    })

    test('should return the same string if it does not have non numbers', () => {
      const result = removeTrailingNonNumbers('ABC.456.789-10', {
        options: { isCNPJ: true }
      })
      expect(result).toBe('ABC.456.789-10')
    })
  })

  describe('when masking', () => {
    describe('CPF: "###.###.###-##"', () => {
      test('should return a brazilian CPF masked value', () => {
        const result = mask('###.###.###-##', '12345678901')

        expect(result).toBe('123.456.789-01')
      })
    })

    describe('CNPJ: "##.###.###/####-##"', () => {
      test('should return a brazilian numeric CNPJ masked value', () => {
        const result = mask('##.###.###/####-##', '28971570000148')

        expect(result).toBe('28.971.570/0001-48')
      })

      test('should return a brazilian alphanumeric CNPJ masked value', () => {
        const result = mask('##.###.###/####-##', 'CD97157L000148', {
          options: { isCNPJ: true }
        })

        expect(result).toBe('CD.971.57L/0001-48')
      })

      test('should NOT return the non-numeric numbers in the end of the string', () => {
        const result = mask('##.###.###/####-##', 'CD97157L0001GT', {
          options: { isCNPJ: true }
        })

        expect(result).toBe('CD.971.57L/0001')
      })
    })

    describe('CEP: "#####-###"', () => {
      test('should return a brazilian zip code number masked value', () => {
        const result = mask('#####-###', '05406150')

        expect(result).toBe('05406-150')
      })
    })

    describe('Phone: "(##) #####-####"', () => {
      test('should return a brazilian mobile number masked value', () => {
        const result = mask('(##) #####-####', '11999999999')

        expect(result).toBe('(11) 99999-9999')
      })
    })

    test('should return a empty string', () => {
      const result = mask('#####-000')

      expect(result).toBe('')
    })
  })
})
