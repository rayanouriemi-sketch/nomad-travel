# Nomad

Concept de planificateur de voyage : inspiration, itinéraire et budget de groupe. **Projet concept** : les destinations et tarifs sont fictifs.

## Pages

- `/` : hero immersif avec recherche
- `/destinations` : recherche (insensible aux accents) et filtre par durée, effectués côté serveur
- `/destinations/:slug` : itinéraire jour par jour à cocher
- `/budget` : dépenses partagées, l'API calcule qui doit combien à qui

## API (Nitro / Node)

- `GET /api/destinations?q=&maxDays=` · `GET /api/destinations/:slug`
- `POST /api/budget` : répartit les dépenses et propose les remboursements entre membres du groupe

## Stack

Nuxt 4 · Vue 3 · TypeScript · Nitro (Node)

## Lancer le projet

```bash
pnpm install
pnpm dev
```
