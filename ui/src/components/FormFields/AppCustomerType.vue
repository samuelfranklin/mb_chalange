<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  rules: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <div class="customer-type">
    <label class="customer-type-field">
      <input type="radio" value="legal" v-model="selected" />
      <span>Pessoa Jurídica</span>
    </label>
    <label class="customer-type-field">
      <input type="radio" value="natural" v-model="selected" />
      <span>Pessoa Física</span>
    </label>
  </div>
</template>

<style scoped>
.customer-type {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.customer-type-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

input:focus {
  outline: none;
}
</style>
