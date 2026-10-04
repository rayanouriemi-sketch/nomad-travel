<script setup lang="ts">
useHead({ title: 'Explorer — Nomad' })
const route = useRoute()
const q = ref(String(route.query.q ?? ''))
const maxDays = ref(14)
const { data: list } = await useFetch('/api/destinations', { query: { q, maxDays } })
</script>

<template>
  <main class="page">
    <h2>Explorer les destinations</h2>
    <div class="tools">
      <input v-model="q" placeholder="Pays, ville, envie…">
      <label>Jusqu'à <b>{{ maxDays }}</b> jours<input v-model.number="maxDays" type="range" min="3" max="14"></label>
    </div>
    <div class="row">
      <NuxtLink v-for="d in list" :key="d.slug" :to="`/destinations/${d.slug}`" class="trip">
        <div class="ph" :style="{ background: d.gradient }" />
        <div class="b"><h3>{{ d.name }}</h3><p>{{ d.country }} · {{ d.days }} jours · {{ d.vibe }}</p><span class="pill">dès {{ d.from.toLocaleString('fr-FR') }} €</span></div>
      </NuxtLink>
    </div>
    <p v-if="!list?.length" class="empty">Aucune destination ne correspond. Essayez « Italie » ou allongez la durée.</p>
  </main>
</template>

<style scoped>
.tools { display: flex; gap: 24px; align-items: center; margin-bottom: 26px; flex-wrap: wrap; }
.tools > input { font: inherit; border: 1px solid #d5e3e8; border-radius: 14px; padding: 12px 16px; width: 320px; }
.tools label { display: grid; gap: 4px; font-size: 14px; color: var(--mut); }
.empty { color: var(--mut); padding: 40px 0; }
</style>
