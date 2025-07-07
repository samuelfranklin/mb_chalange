<script setup>
import { AppFooter, AppHeader, AppMain, AppToast } from './'
</script>

<template>
  <AppHeader />
  <AppMain>
    <AppToast />
    <slot />
  </AppMain>
  <AppFooter />
</template>
