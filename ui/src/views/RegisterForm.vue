<script setup>
import { AppButton, AppCard } from '@/components'
import { computed, reactive, ref } from 'vue'
import { AppCustomerType, AppInputText } from '@/components/FormFields/index.js'

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
const isWelcomeStep = computed(() => currentStep.value === 0)
const isCustomerInfoStep = computed(() => currentStep.value === 1)
const isPasswordStep = computed(() => currentStep.value === 2)
const isCheckoutStep = computed(() => currentStep.value === 3)
const steps = computed(() => [
  'Seja bem-vindo(a)',
  formFields.customerType === 'legal' ? 'Pessoa Jurídica' : 'Pessoa Física',
  'Senha de acesso',
  'Revise suas informações',
])
const stepLabel = computed(() => `Etapa ${currentStep.value + 1} de ${steps.value.length}`)

const fieldLabels = computed(() => ({
  email: 'Email',
  name: isLegal.value ? 'Razão Social' : 'Nome',
  document: isLegal.value ? 'CNPJ' : 'CPF',
  registrationDate: isLegal.value ? 'Data de Abertura' : 'Data de Nascimento',
  phone: 'Telefone',
  password: 'Senha',
}))

function nextStep() {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value += 1
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}

function handleSubmit() {
  console.log('submitting')
}
</script>

<template>
  <div class="register-form">
    <header>
      <sup>{{ stepLabel }}</sup>
      <h1>{{ steps[currentStep] }}</h1>
    </header>

    <AppCard>
      <AppInputText
        v-if="isWelcomeStep || isCheckoutStep"
        v-model="formFields.email"
        :label="fieldLabels.email"
      />
      <AppCustomerType v-if="isWelcomeStep" v-model="formFields.customerType" />

      <AppInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.name"
        :label="fieldLabels.name"
      />
      <AppInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.document"
        :label="fieldLabels.document"
      />
      <AppInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.registrationDate"
        :label="fieldLabels.registrationDate"
        type="date"
      />
      <AppInputText
        v-if="isCustomerInfoStep || isCheckoutStep"
        v-model="formFields.phone"
        :label="fieldLabels.phone"
      />

      <AppInputText
        v-if="isCheckoutStep"
        v-model="formFields.password"
        :label="fieldLabels.password"
        type="password"
        rules="required"
        help-text="Confirme sua senha"
      />

      <AppInputText
        v-if="isPasswordStep"
        v-model="passwordCheck"
        :label="fieldLabels.password"
        type="password"
        rules="required"
      />

      <div class="register-form-step-actions">
        <AppButton label="Voltar" outlined @click="previousStep" v-if="currentStep > 0" />
        <AppButton
          :label="isCheckoutStep ? 'Cadastrar' : 'Continuar'"
          @click="() => (isCheckoutStep ? handleSubmit() : nextStep())"
        />
      </div>
    </AppCard>
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
