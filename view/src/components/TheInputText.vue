<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: false,
  },
  helpText: {
    type: String,
    required: false,
  },
  rules: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  errorMessage: {
    type: String,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'input', 'blur'])

const hasLabel = computed(() => !!props.label)
const isRequired = computed(() => props.rules?.includes('required'))
const isNotValid = computed(() => !!props.errorMessage)
const hasHelpText = computed(() => !!props.helpText && !props.errorMessage)
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
    <span v-if="hasLabel" :class="['app-input-label', { required: isRequired }]">{{ label }}</span>
    <input
      :id
      v-model="data"
      :type
      class="app-input-field"
      :class="isNotValid ? 'invalid' : ''"
      @input="$emit('input')"
      @blur="$emit('blur')"
    />
    <sub v-if="hasHelpText" class="app-input-help">{{ helpText }}</sub>
    <sub v-if="isNotValid" class="app-input-error-message">{{ errorMessage }}</sub>
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

.app-input-field.invalid {
  border-color: var(--color-error);
}
.app-input-help {
  color: var(--color-help);
}

.app-input-error-message {
  color: var(--color-error);
}
</style>
