export const useValidator = () => {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) || 'Email inválido'
  }

  const validateRequired = (value) => {
    const isNotEmpty = value !== null && value !== undefined && value !== ''
    return isNotEmpty || 'Campo obrigatório'
  }

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isValidLength = password.length >= 6

    if (!isValidLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return 'Senha não obedece os critérios de aceitação'
    }
    return true
  }

  const validateDate = (date) => {
    const today = new Date()
    const inputDate = new Date(date)

    if (isNaN(inputDate.getDate())) return 'Data inválida'

    if (inputDate > today) {
      return 'Data não pode ser maior que hoje'
    }

    return true
  }

  return {
    validateEmail,
    validateRequired,
    validatePassword,
    validateDate,
  }
}
