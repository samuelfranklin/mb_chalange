<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Click click',
    required: false,
  },
  type: {
    type: String,
    default: 'button',
    required: false,
  },
  text: {
    type: Boolean,
    default: false,
    required: false,
  },
  outlined: {
    type: Boolean,
    default: false,
    required: false,
  },
})

defineEmits(['click'])

const btnAppearance = computed(() => ({
  'btn-text': props.text,
  'btn-outlined': props.outlined,
  'btn-filled': !props.text && !props.outlined,
}))
</script>

<template>
  <button :class="['btn', btnAppearance]" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  width: 100%;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  font-weight: 400;
  border: 1px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-text {
  background-color: transparent;
  color: var(--color-primary);
}

.btn-outlined {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
