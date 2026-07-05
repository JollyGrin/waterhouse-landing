# waterhouse-landing

The **live** public marketing site for Waterhouse Studios (the sibling
`waterhouse-landing-next/` is an abandoned Next.js rewrite — ignore it).
SvelteKit 2 + Svelte 5, Tailwind 4, Threlte/three.js for the interactive
drum-machine visual theme. Fully static (`adapter-static`, everything
prerendered).

## Commands

```bash
bun install
bun run dev        # Vite :5173
bun run build      # static site → build/
bun run check      # svelte-check
bun run lint
bun run og         # regenerate OG images (Satori)
bun run brand      # regenerate logos/cover
```

No secrets needed locally. Only env var: `PUBLIC_BASE_PATH` (CI sets it).

## Deploy

**GitHub Pages** (the one Waterhouse project NOT on Railway): push to `main`
→ `.github/workflows/deploy.yml` builds with
`PUBLIC_BASE_PATH=/svelte-aframe` and publishes `build/`. That base path is a
legacy repo-name artifact — confirm with Dean before touching it or the
custom-domain setup.

## Docs

`README.md` is untouched `sv` boilerplate — ignore. The real spec is
**`docs/SEO_SPEC.md`** (recent SEO push: schema.org, sitemap, indexable
content pages, mediakit). Routes live in `src/routes/` (home, /studios,
/ateliers, /residency, /radio, /events, /about, /faq, /contact, /booking,
/mediakit, /twitch, /ade, /privacy, /terms).

Note: the site is informational; actual booking/portal functionality lives in
`../waterhouse-mono` (portal at waterhousestudios.nl).
