<script setup>
import { AppCustomerType, AppInputText } from '@/components/FormFields'
import { AppButton, AppCard } from '@/components'
import { computed, ref } from 'vue'

const customerType = ref('legal') // 'legal' | 'natural';
const currentStep = ref(0)
const steps = [
  'Seja bem-vindo(a)',
  customerType.value ? 'Pessoa Jurídica' : 'Pessoa Física',
  'Senha de acesso',
  'Revise suas informações',
]

const stepLabel = computed(() => `Etapa ${currentStep.value + 1} de ${steps.length}`)

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1
  }
}
</script>

<template>
  <div class="register-form">
    <header>
      <sup>{{ stepLabel }}</sup>
      <h1>{{ steps[currentStep] }}</h1>
    </header>

    <AppCard class="app-card">
      <AppInputText />
      <AppCustomerType v-model="customerType" />
      <AppButton label="continuar" @click="nextStep" />
    </AppCard>
  </div>
</template>

<style scoped>
.register-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-items: stretch;
  gap: 1rem;
}
</style>
