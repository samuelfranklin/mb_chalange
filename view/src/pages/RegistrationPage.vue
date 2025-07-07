<script setup>
import { TheButton, TheCard, TheCustomerType, TheInputText } from '@/components'
import { computed, reactive, ref, toRaw } from 'vue'
import { useFormValidator } from '@/composables/useFormValidator'
import { useSha256 } from '@/composables/useSha256'

const currentStep = ref(0)
const passwordCheck = ref(null)
const formFields = reactive({
  email: null,
  customerType: 'legal',
  name: null,
  document: null,
  registrationDate: null,
  phone: null,
  password: null,
})

const isLegal = computed(() => formFields.customerType === 'legal')
const validationSchema = computed(() => ({
  email: 'required|email',
  name: 'required',
  document: isLegal.value ? 'required|cnpj' : 'required|cpf',
  registrationDate: 'required|date',
  phone: 'required|phone',
  password: 'required|password',
}))

const { errors, validateField } = useFormValidator(formFields, validationSchema)

const isWelcomeStep = computed(() => currentStep.value === 0)
const isCustomerInfoStep = computed(() => currentStep.value === 1)
const isPasswordStep = computed(() => currentStep.value === 2)
const isCheckoutStep = computed(() => currentStep.value === 3)
const stepLabel = computed(() => `Etapa ${currentStep.value + 1} de ${steps.value.length}`)
const steps = computed(() => [
  'Seja bem-vindo(a)',
  isLegal.value ? 'Pessoa Jurídica' : 'Pessoa Física',
  'Senha de acesso',
  'Revise suas informações',
])
const fieldLabels = computed(() => ({
  email: 'Email',
  name: isLegal.value ? 'Razão Social' : 'Nome',
  document: isLegal.value ? 'CNPJ' : 'CPF',
  registrationDate: isLegal.value ? 'Data de Abertura' : 'Data de Nascimento',
  phone: 'Telefone',
  password: 'Senha',
}))

const cantMoveOn = computed(() => {
  if (isWelcomeStep.value) {
    return !!errors.email || !formFields.email
  }

  if (isCustomerInfoStep.value) {
    return (
      !!errors.name ||
      !formFields.name ||
      !!errors.document ||
      !formFields.document ||
      !!errors.registrationDate ||
      !formFields.registrationDate ||
      !!errors.phone ||
      !formFields.phone
    )
  }

  if (isPasswordStep.value) {
    return !!errors.password || !formFields.password
  }

  return Object.values(errors).some((error) => error !== null) || !passwordCheck.value
})

function nextStep() {
  currentStep.value += 1
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}

function handleBlur(fieldName) {
  validateField(fieldName)
}

async function handleSubmit() {
  const payload = { ...toRaw(formFields) }
  payload.password = await useSha256()(payload.password)

  await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Erro ao cadastrar usuário')
      }
      return res.json()
    })
    .then((data) => {
      console.log('Usuário cadastrado com sucesso:', data)
    })
    .catch((error) => {
      console.error('Erro:', error)
    })
}

function checkPassword() {
  if (formFields.password !== passwordCheck.value) {
    errors.password = 'As senhas não conferem'
  } else {
    errors.password = null
  }
}
</script>

<template>
  <div class="register-form">
    <header>
      <sup>{{ stepLabel }}</sup>
      <h1>{{ steps[currentStep] }}</h1>
    </header>

    <TheCard>
      <TheInputText
        v-if="isWelcomeStep || isCheckoutStep"
        v-model="formFields.email"
        :label="fieldLabels.email"
        :error-message="errors['email']"
        @input="validateField('email')"
        @blur="handleBlur('email')"
        @keydown.enter="nextStep"
      />
      <TheCustomerType v-if="isWelcomeStep" v-model="formFields.customerType" />

      <TheInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.name"
        :label="fieldLabels.name"
        :error-message="errors['name']"
        @input="validateField('name')"
        @blur="handleBlur('name')"
        @keydown.enter="nextStep"
      />
      <TheInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.document"
        :label="fieldLabels.document"
        :error-message="errors['document']"
        @input="validateField('document')"
        @blur="handleBlur('document')"
        @keydown.enter="nextStep"
      />
      <TheInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.registrationDate"
        :label="fieldLabels.registrationDate"
        type="date"
        :error-message="errors['registrationDate']"
        @input="validateField('registrationDate')"
        @blur="handleBlur('registrationDate')"
        @keydown.enter="nextStep"
      />
      <TheInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.phone"
        :label="fieldLabels.phone"
        :error-message="errors['phone']"
        @input="validateField('phone')"
        @blur="handleBlur('phone')"
        @keydown.enter="nextStep"
      />

      <TheInputText
        v-if="isCheckoutStep"
        v-model="passwordCheck"
        :label="fieldLabels.password"
        type="password"
        rules="required"
        help-text="Confirme sua senha"
        :error-message="errors['password']"
        @input="checkPassword"
        @blur="checkPassword"
        @keydown.enter="handleSubmit"
      />

      <TheInputText
        v-if="isPasswordStep"
        v-model="formFields.password"
        :label="fieldLabels.password"
        type="password"
        :error-message="errors['password']"
        @input="validateField('password')"
        @blur="handleBlur('password')"
        @keydown.enter="nextStep"
      />

      <div class="register-form-step-actions">
        <TheButton v-if="currentStep > 0" label="Voltar" outlined @click="previousStep" />
        <TheButton
          :label="isCheckoutStep ? 'Cadastrar' : 'Continuar'"
          @click="() => (isCheckoutStep ? handleSubmit() : nextStep())"
          :disabled="cantMoveOn"
        />
      </div>
    </TheCard>
  </div>
</template>

<style scoped>
.register-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 1rem;
}

.register-form-step-actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}
</style>
