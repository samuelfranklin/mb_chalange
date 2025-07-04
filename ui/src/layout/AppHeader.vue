<script setup lang="ts">
import AppLogo from '@/components/Icons/AppLogo.vue'
import { ref } from 'vue'

const theme = ref(false)

function toggleTheme() {
  theme.value = document.querySelector('html').classList.toggle('dark-theme')
}
</script>

<template>
  <header class="header">
    <AppLogo class="header-logo" />
    <button type="button" class="header-button-theme" @click="toggleTheme">
      <img
        v-if="theme"
        src="@/assets/images/light.svg"
        alt="Theme"
        class="header-button-theme-icon"
      />
      <img v-else src="@/assets/images/dark.svg" alt="Theme" class="header-button-theme-icon" />
    </button>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  inset-inline: 0;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: var(--surface-color);
  box-shadow: var(--box-shadow);
}

.header-logo {
  width: 2.5rem;
  height: 2.5rem;
}

.header-button-theme {
  background-color: transparent;
  border: none;
}

.header-button-theme-icon {
  color: var(--text-color-primary);
}
</style>
