// Calcule qui doit combien à qui pour équilibrer les dépenses d'un groupe
export default defineEventHandler(async (event) => {
  const { expenses } = await readBody<{ expenses?: { who: string, amount: number }[] }>(event)
  const list = (expenses ?? []).filter(e => e.who?.trim() && Number(e.amount) > 0)
  if (!list.length) return { total: 0, share: 0, transfers: [] }

  const paid = new Map<string, number>()
  list.forEach(e => paid.set(e.who.trim(), (paid.get(e.who.trim()) ?? 0) + Number(e.amount)))
  const total = [...paid.values()].reduce((a, b) => a + b, 0)
  const share = total / paid.size

  const debtors = [...paid].map(([who, v]) => ({ who, v: share - v })).filter(x => x.v > 0.005)
  const creditors = [...paid].map(([who, v]) => ({ who, v: v - share })).filter(x => x.v > 0.005)
  const transfers: { from: string, to: string, amount: number }[] = []
  for (const d of debtors) {
    for (const c of creditors) {
      const amount = Math.min(d.v, c.v)
      if (amount < 0.005) continue
      transfers.push({ from: d.who, to: c.who, amount: Math.round(amount * 100) / 100 })
      d.v -= amount
      c.v -= amount
    }
  }
  return { total: Math.round(total * 100) / 100, share: Math.round(share * 100) / 100, transfers }
})
