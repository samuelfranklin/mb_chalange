<script setup>
import { AppFooter, AppHeader, AppMain } from './'
</script>

<template>
  <AppHeader />
  <AppMain>
    <slot />
  </AppMain>
  <AppFooter />
</template>
