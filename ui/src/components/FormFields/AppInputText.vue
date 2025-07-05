<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  helpText: {
    type: String,
    required: false,
  },
  rules: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const errorMessage = ref(null)

const isRequired = computed(() => props.rules?.includes('required'))
const hasErrorMessage = computed(() => !!errorMessage.value)
const hasHelpText = computed(() => !!props.helpText && !hasErrorMessage.value)
const id = computed(() => `app-input-${Math.random().toString(36).substring(2, 15)}`)
const data = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <label :for="id" class="app-input">
    <span :class="['app-input-label', { required: isRequired }]">Email</span>
    <input :id v-model="data" type="text" class="app-input-field" />
    <sub v-if="hasHelpText" class="app-input-help">escreva seu melhor email</sub>
    <sub v-if="hasErrorMessage" class="app-input-error">deve ser um endereço válido</sub>
  </label>
</template>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-input-label.required::after {
  content: '*';
  color: var(--color-error);
}

.app-input-field {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  font-size: 1rem;
  font-family: var(--font-body);
}

.app-input-help {
  color: var(--color-help);
}

.app-input-error {
  color: var(--color-error);
}
</style>
