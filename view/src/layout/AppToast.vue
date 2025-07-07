<script setup>
import { computed, inject } from 'vue'

const { toasts, remove } = inject('$toast')
const hasToasts = computed(() => toasts.value.length)
</script>

<template>
  <div class="toast-area" v-if="hasToasts">
    <div class="toast" v-for="toast in toasts" :key="toast.id" :class="toast.severity">
      <div>
        {{ toast.message }}
      </div>
      <button @click="remove(toast)" class="close-button">×</button>
    </div>
  </div>
</template>

<style scoped>
.toast-area {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 100%;
  max-width: 18rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0.125rem solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color-primary);
  font-family: var(--font-body);
  box-shadow: var(--box-shadow);
}

.toast.success {
  color: var(--color-success);
  border-color: var(--color-success);
  background-color: var(--color-success-lighter);
}

.toast.error {
  color: var(--color-error);
  border-color: var(--color-error);
  background-color: var(--color-error-lighter);
}

.toast.warning {
  color: var(--color-warning);
  border-color: var(--color-warning);
  background-color: var(--color-warning-lighter);
}

.toast.info {
  color: var(--color-help);
  border-color: var(--color-help);
  background-color: var(--color-help-lighter);
}
.close-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--text-color-secondary);
  cursor: pointer;
  padding: 0;
}
</style>
