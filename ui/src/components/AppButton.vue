<script setup>
defineProps({
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
</script>

<template>
  <button class="btn" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
</style>
