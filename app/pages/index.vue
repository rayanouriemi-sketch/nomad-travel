<script setup lang="ts">
const { data: ideas } = await useFetch('/api/destinations')
const q = ref('')
function search() {
  navigateTo({ path: '/destinations', query: q.value ? { q: q.value } : {} })
}
</script>

<template>
  <main>
    <header class="hero">
      <div class="copy">
        <h1>Votre prochain voyage, planifié en 5 minutes.</h1>
        <p>Itinéraire jour par jour, budget partagé et idées de destinations. Tout au même endroit.</p>
        <form class="search" @submit.prevent="search">
          <label>Destination<input v-model="q" placeholder="Où allez-vous ? (ex. Portugal)"></label>
          <button class="btn">Explorer</button>
        </form>
      </div>
    </header>
    <section class="page">
      <h2>Idées pour cette saison</h2>
      <div class="row">
        <NuxtLink v-for="d in ideas?.slice(0, 4)" :key="d.slug" :to="`/destinations/${d.slug}`" class="trip">
          <div class="ph" :style="{ background: d.gradient }" />
          <div class="b"><h3>{{ d.name }}</h3><p>{{ d.days }} jours · {{ d.vibe }}</p><span class="pill">dès {{ d.from.toLocaleString('fr-FR') }} €</span></div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero { min-height: 72vh; padding: 100px 56px 60px; color: #fff; background: linear-gradient(180deg, rgba(10, 30, 45, .25), rgba(10, 30, 45, .75)), linear-gradient(135deg, #127a87 0%, #3aa6b9 35%, #f2b880 70%, #ff7a45 100%); display: flex; }
.copy { margin-top: auto; max-width: 720px; }
h1 { font-size: clamp(40px, 5.5vw, 76px); font-weight: 800; line-height: 1; letter-spacing: -2px; }
.copy p { font-size: 18px; opacity: .9; margin: 18px 0 28px; }
.search { display: flex; background: #fff; border-radius: 20px; padding: 8px; gap: 4px; max-width: 620px; box-shadow: 0 20px 50px rgba(0, 0, 0, .25); }
.search label { flex: 1; padding: 10px 16px; color: var(--ink); font-size: 12px; font-weight: 800; }
.search input { display: block; border: 0; outline: 0; font: inherit; font-size: 15px; font-weight: 600; color: var(--mut); width: 100%; margin-top: 2px; }
@media (max-width: 860px) { .hero { padding: 90px 16px 40px; } }
</style>
