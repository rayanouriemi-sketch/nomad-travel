<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <nav class="nav" :class="{ dark: route.path === '/' }">
      <NuxtLink to="/" class="logo">nomad</NuxtLink>
      <div><NuxtLink to="/destinations">Explorer</NuxtLink><NuxtLink to="/budget">Budget</NuxtLink></div>
    </nav>
    <NuxtPage />
  </div>
</template>
