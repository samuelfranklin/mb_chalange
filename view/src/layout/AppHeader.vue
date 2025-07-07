<script setup lang="ts">
import AppLogo from '@/components/Icons/AppLogo.vue'
import DarkTheme from '@/components/Icons/DarkTheme.vue'
import LightTheme from '@/components/Icons/LightTheme.vue'
import { ref } from 'vue'

const theme = ref(false)

const storedTheme = localStorage.getItem('theme')
theme.value = storedTheme && storedTheme === 'dark'
theme.value
  ? document.querySelector('html').classList.add('dark-theme')
  : document.querySelector('html').classList.remove('dark-theme')

function toggleTheme() {
  theme.value = document.querySelector('html').classList.toggle('dark-theme')
  localStorage.setItem('theme', theme.value ? 'dark' : 'light')
}
</script>

<template>
  <header class="header">
    <AppLogo class="header-logo" />
    <button type="button" class="header-button-theme" @click="toggleTheme">
      <LightTheme v-if="theme" class="theme-icon" />
      <DarkTheme v-else class="theme-icon" />
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

.theme-icon {
  width: 1rem;
  height: 1rem;
}

.header-button-theme {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

@media (min-width: 768px) {
  .theme-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
