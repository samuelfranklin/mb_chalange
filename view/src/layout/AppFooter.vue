<script setup></script>

<template>
  <footer>&copy; {{ new Date().getFullYear() }} Samuel F. Venturin.</footer>
</template>

<style scoped>
footer {
  height: 2rem;
  position: fixed;
  bottom: 0;
  inset-inline: 0;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-family: var(--font-title);
  background-color: var(--background-color);
}
</style>
