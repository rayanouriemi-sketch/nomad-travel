export default defineEventHandler((event) => {
  const { q = '', maxDays } = getQuery(event) as { q?: string, maxDays?: string }
  const search = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  return destinations
    .filter(d => !search || `${d.name} ${d.country} ${d.vibe}`.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(search))
    .filter(d => !maxDays || d.days <= Number(maxDays))
    .map(({ plan, ...d }) => d)
})
