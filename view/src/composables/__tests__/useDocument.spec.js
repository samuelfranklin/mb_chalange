import { describe, expect, it } from 'vitest'
import { useDocument } from '../useDocument'

describe('useDocument', () => {
  const { cpf, cnpj } = useDocument()
  describe('cpf', () => {
    const validDocument = cpf('653.188.420-70')
    const invalidDocument = cpf('123.456.789-01')

    it('should return a clean document number even if it is not valid', () => {
      expect(invalidDocument.cleanDocumentNumber).toBe('12345678901')
      expect(validDocument.cleanDocumentNumber).toBe('65318842070')
    })

    it('should validate correct a provided CPF', () => {
      expect(validDocument.isValid()).toBeTruthy()
      expect(invalidDocument.isValid()).toBeFalsy()
    })

    it('should return a masked document number when valid and null when invalid', () => {
      expect(validDocument.masked()).toBe('653.188.420-70')
      expect(invalidDocument.masked()).toBeNull()
    })
  })
  describe('cnpj', () => {
    const validDocument = cnpj('57.155.700/0001-72')
    const invalidDocument = cnpj('12.345.678/0001-00')

    it('should return a clean document number even if it is not valid', () => {
      expect(invalidDocument.cleanDocumentNumber).toBe('12345678000100')
      expect(validDocument.cleanDocumentNumber).toBe('57155700000172')
    })

    it('should validate correct a provided CNPJ', () => {
      expect(invalidDocument.isValid()).toBeFalsy()
      expect(validDocument.isValid()).toBeTruthy()
    })

    it('should return a masked document number when valid and null when invalid', () => {
      expect(validDocument.masked()).toBe('57.155.700/0001-72')
      expect(invalidDocument.masked()).toBeNull()
    })
  })
})
