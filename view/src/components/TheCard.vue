<script setup></script>

<template>
  <div class="app-card">
    <slot />
  </div>
</template>

<style scoped>
.app-card {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 0.5rem;
  background-color: var(--surface-color);
  box-shadow: var(--box-shadow);
  padding: 1rem;
  gap: 1rem;
}
</style>
