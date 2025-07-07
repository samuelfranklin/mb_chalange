<script setup></script>

<template>
  <main class="container">
    <slot />
  </main>
</template>

<style scoped>
main {
  position: relative;
  top: 4rem;
  min-height: calc(100vh - 6rem);
  padding: 1rem;
}
</style>
