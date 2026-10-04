export default defineEventHandler((event) => {
  const d = destinations.find(x => x.slug === getRouterParam(event, 'slug'))
  if (!d) throw createError({ statusCode: 404, statusMessage: 'Destination introuvable' })
  return d
})
