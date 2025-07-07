import { describe, expect, it } from 'vitest'
import { useFormValidator } from '../useFormValidator'
import { computed, reactive } from 'vue'

describe('useFormValidator', () => {
  const formState = reactive({
    email: null,
    name: null,
    password: null,
  })

  const validationSchema = computed(() => ({
    email: 'required|email',
    name: 'required',
    password: 'required|password',
  }))

  const validator = useFormValidator(formState, validationSchema)

  it('should validate required fields', () => {
    Object.keys(formState).forEach((fieldName) => validator.validateField(fieldName))
    expect(validator.errors.email).toBe('Campo obrigatório')
    expect(validator.errors.name).toBe('Campo obrigatório')
    expect(validator.errors.password).toBe('Campo obrigatório')
  })

  it('should validate invalid fields', () => {
    formState.email = 'invalid_email'
    formState.password = '123'

    Object.keys(formState).forEach((fieldName) => validator.validateField(fieldName))
    expect(validator.errors.email).toBe('Email inválido')
    expect(validator.errors.password).toBe('Senha não obedece os critérios de aceitação')
  })

  it('should validate valid fields', () => {
    formState.name = 'Orácio'
    formState.email = 'oracio@teste.com'
    formState.password = 'SenhaForte123#'

    Object.keys(formState).forEach((fieldName) => validator.validateField(fieldName))

    expect(validator.errors.email).toBeNull()
    expect(validator.errors.name).toBeNull()
    expect(validator.errors.password).toBeNull()
  })
})
