<script setup lang="ts">
useHead({ title: 'Budget partagé — Nomad' })

const expenses = ref([
  { who: 'Inès', label: 'Location de voiture', amount: 240 },
  { who: 'Karim', label: 'Airbnb', amount: 510 },
  { who: 'Lucie', label: 'Courses', amount: 86 },
])
const result = ref<{ total: number, share: number, transfers: { from: string, to: string, amount: number }[] } | null>(null)

async function compute() {
  result.value = await $fetch('/api/budget', { method: 'POST', body: { expenses: expenses.value } })
}
watch(expenses, compute, { deep: true, immediate: true })
const euro = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
</script>

<template>
  <main class="page wrap">
    <section>
      <h2>Dépenses du groupe</h2>
      <div v-for="(e, i) in expenses" :key="i" class="line">
        <input v-model="e.who" placeholder="Qui ?">
        <input v-model="e.label" placeholder="Quoi ?">
        <input v-model.number="e.amount" type="number" min="0" placeholder="€">
        <button class="x" aria-label="Supprimer" @click="expenses.splice(i, 1)">×</button>
      </div>
      <button class="add" @click="expenses.push({ who: '', label: '', amount: 0 })">＋ Ajouter une dépense</button>
    </section>
    <aside v-if="result" class="card">
      <p class="mut">Total</p><p class="big">{{ euro(result.total) }}</p>
      <p class="mut">Soit {{ euro(result.share) }} par personne</p>
      <h3>Pour être quittes</h3>
      <p v-if="!result.transfers.length" class="mut">Tout le monde est à l'équilibre 🎉</p>
      <div v-for="t in result.transfers" :key="t.from + t.to" class="tr"><b>{{ t.from }}</b> → <b>{{ t.to }}</b><span>{{ euro(t.amount) }}</span></div>
      <small>Calcul effectué par l'API (Node).</small>
    </aside>
  </main>
</template>

<style scoped>
.wrap { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
.line { display: grid; grid-template-columns: 1fr 1.4fr 110px 40px; gap: 8px; margin-bottom: 10px; }
.line input { font: inherit; border: 1px solid #d5e3e8; border-radius: 12px; padding: 12px 14px; min-width: 0; }
.x { border: 0; background: var(--sky); border-radius: 12px; font-size: 20px; cursor: pointer; }
.add { font: inherit; font-weight: 700; color: var(--teal); background: none; border: 2px dashed #b9d8df; border-radius: 12px; padding: 12px 16px; cursor: pointer; width: 100%; }
.card { background: var(--ink); color: #fff; border-radius: 24px; padding: 28px; }
.mut { color: #9fb0bd; }
.big { font-size: 44px; font-weight: 800; }
h3 { margin: 22px 0 10px; }
.tr { display: flex; gap: 8px; padding: 10px 0; border-top: 1px solid rgba(255, 255, 255, .12); }
.tr span { margin-left: auto; color: var(--acc); font-weight: 800; }
small { display: block; margin-top: 18px; color: #9fb0bd; }
@media (max-width: 860px) { .wrap { grid-template-columns: 1fr; } .line { grid-template-columns: 1fr 1fr 80px 40px; } }
</style>
