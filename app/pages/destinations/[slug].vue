<script setup lang="ts">
const route = useRoute()
const { data: d, error } = await useFetch(`/api/destinations/${route.params.slug}`)
if (error.value) throw createError({ statusCode: 404, statusMessage: 'Destination introuvable', fatal: true })
useHead({ title: () => `${d.value?.name} — Nomad` })
const done = ref<number[]>([])
const toggle = (i: number) => (done.value = done.value.includes(i) ? done.value.filter(x => x !== i) : [...done.value, i])
</script>

<template>
  <main v-if="d">
    <header class="cover" :style="{ background: d.gradient }">
      <div class="page">
        <NuxtLink to="/destinations" class="back">← Toutes les destinations</NuxtLink>
        <h1>{{ d.name }}</h1>
        <p>{{ d.country }} · {{ d.days }} jours · {{ d.vibe }} · dès {{ d.from.toLocaleString('fr-FR') }} €</p>
      </div>
    </header>
    <section class="page">
      <h2>Itinéraire jour par jour <small>{{ done.length }} / {{ d.plan.length }} étapes cochées</small></h2>
      <ol class="plan">
        <li v-for="(step, i) in d.plan" :key="i" :class="{ ok: done.includes(i) }" @click="toggle(i)">
          <span class="day">J{{ i + 1 }}</span><span>{{ step }}</span><i>{{ done.includes(i) ? '✓' : '' }}</i>
        </li>
      </ol>
      <NuxtLink to="/budget" class="btn">Préparer le budget du groupe →</NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.cover { color: var(--ink); }
.cover .page { padding-top: 40px; padding-bottom: 50px; }
.back { font-weight: 700; font-size: 14px; }
h1 { font-size: clamp(40px, 6vw, 80px); font-weight: 800; letter-spacing: -2px; margin: 14px 0 8px; }
h2 small { font-size: 14px; color: var(--mut); font-weight: 600; margin-left: 10px; }
.plan { list-style: none; padding: 0; display: grid; gap: 10px; margin-bottom: 28px; max-width: 760px; }
.plan li { display: flex; gap: 16px; align-items: center; background: var(--sky); border-radius: 16px; padding: 16px 18px; cursor: pointer; transition: opacity .2s; }
.plan li.ok { opacity: .55; text-decoration: line-through; }
.day { font-weight: 800; color: var(--teal); min-width: 34px; }
.plan i { margin-left: auto; font-style: normal; font-weight: 800; color: var(--teal); }
.btn { display: inline-block; }
</style>
