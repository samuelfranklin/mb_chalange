import { describe, expect, it } from 'vitest'
import { useValidator } from '../useValidator.js'

describe('useValidator', () => {
  const validator = useValidator()
  describe('validateEmail', () => {
    const validEmail = 'teste@teste.com'
    const invalidEmail = 'invalid_email'

    it('should return true for a valid email', () => {
      expect(validator.validateEmail(validEmail)).toBeTruthy()
    })

    it('should return an error message for an invalid email', () => {
      expect(validator.validateEmail(invalidEmail)).toBe('Email inválido')
    })
  })

  describe('validateRequired', () => {
    it('should return true for a non-empty string', () => {
      expect(validator.validateRequired('some value')).toBeTruthy()
    })

    it('should return error message for an empty value', () => {
      expect(validator.validateRequired('')).toBe('Campo obrigatório')
      expect(validator.validateRequired(null)).toBe('Campo obrigatório')
      expect(validator.validateRequired(undefined)).toBe('Campo obrigatório')
    })
  })

  describe('validatePassword', () => {
    it('should return an error message for a password shorter than 6 characters', () => {
      expect(validator.validatePassword('12345')).toBe(
        'Senha não obedece os critérios de aceitação',
      )
    })

    it('should return an error message for a password without uppercase letters', () => {
      expect(validator.validatePassword('password')).toBe(
        'Senha não obedece os critérios de aceitação',
      )
    })

    it('should return an error message for a password without lowercase letters', () => {
      expect(validator.validatePassword('PASSWORD')).toBe(
        'Senha não obedece os critérios de aceitação',
      )
    })

    it('should return an error message for a password without numbers', () => {
      expect(validator.validatePassword('Password')).toBe(
        'Senha não obedece os critérios de aceitação',
      )
    })

    it('should return an error message for a password without special characters', () => {
      expect(validator.validatePassword('Password1')).toBe(
        'Senha não obedece os critérios de aceitação',
      )
    })

    it('should return true for a valid password', () => {
      expect(validator.validatePassword('Password1!')).toBeTruthy()
    })
  })

  describe('validateDate', () => {
    it('should return an error message when date is grater than today', () => {
      expect(validator.validateDate(new Date().setDate(new Date().getDate() + 1))).toBe(
        'Data não pode ser maior que hoje',
      )
    })

    it('should return an error message when date is invalid', () => {
      expect(validator.validateDate('invalid_date')).toBe('Data inválida')
    })
  })
})
