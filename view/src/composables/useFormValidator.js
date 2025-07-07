import { computed, reactive } from 'vue'
import { useValidator } from './useValidator'

export function useFormValidator(formState, validationSchema) {
  const validators = useValidator()
  const errors = reactive({})

  const validateField = (fieldName) => {
    const rules = validationSchema.value[fieldName]?.split('|') || []
    const value = formState[fieldName]
    errors[fieldName] = null

    for (const rule of rules) {
      let validatorFn
      switch (rule) {
        case 'required':
          validatorFn = validators.validateRequired
          break
        case 'email':
          validatorFn = validators.validateEmail
          break
        case 'password':
          validatorFn = validators.validatePassword
          break
        case 'date':
          validatorFn = validators.validateDate
          break
        case 'cpf':
          validatorFn = validators.validateCPF
          break
        case 'cnpj':
          validatorFn = validators.validateCNPJ
          break
        default:
          continue
      }

      const result = validatorFn(value)
      if (result !== true) {
        errors[fieldName] = result
        return false
      }
    }
    return true
  }

  const isFormValid = computed(() => {
    for (const fieldName in validationSchema) {
      if (!validateField(fieldName)) {
        return false
      }
    }

    return Object.values(errors).every((error) => !error)
  })

  return {
    errors,
    isFormValid,
    validateField,
  }
}
