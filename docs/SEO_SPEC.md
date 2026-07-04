# Waterhouse Studios — SEO & AI-Visibility Improvement Spec

**Site:** https://waterhousestudios.nl
**Repo:** `waterhouse-landing` (SvelteKit 2 + Svelte 5, `adapter-static`, GitHub Pages behind Cloudflare)
**Date:** 2026-07-03
**Business:** Music studio rental (25 acoustically designed studios), ateliers, artist residency (15+ residents, growing), in-person events (capacity ~120), and online radio via Twitch (`twitch.tv/waterhousestudios`). Location: Danzigerkade 1, 1013 AP Amsterdam (Houthaven).

---

## 1. Executive summary

The site has a solid technical foundation (fully prerendered SvelteKit, Brotli, HTTP/3) but is **nearly invisible to search engines and LLMs for anything except the brand name**, for three structural reasons:

1. **The content doesn't exist as pages.** Everything that describes the business — studios, pricing, ateliers, about, stream, residency — lives inside JS modals on a single homepage. There are no `/studios`, `/pricing`, `/events`, `/radio`, or `/residents` URLs for Google or an AI to rank, extract, or cite. The current workaround (a visually-hidden `seo-content` div) is a cloaking-risk pattern Google explicitly warns against.
2. **Zero entity/structured data.** No JSON-LD anywhere, no `og:image`, no sitemap, no canonical, no H1 on the homepage. Google has no machine-readable idea this is a music venue in Amsterdam with an address, prices, events, and a radio station.
3. **The web mislabels the business.** Third-party surfaces (Resident Advisor, DICE, djguide) index Waterhouse only as a **club/event venue**. It is absent from every studio-rental aggregator that AI assistants actually cite (Gearbooker, SoundBetter, ProStudioTime, Spacebase). An LLM asked "best music studio to rent in Amsterdam" today will not mention Waterhouse. LinkedIn is miscategorized as "Real Estate" with 5 followers. No Google Business Profile reviews surface in search.

The 2026 guidance is unambiguous (Google's May 2026 generative-AI guide: *"AI search is still SEO"*): the same fixes — real indexable pages, entity schema, Google Business Profile, presence on citable third-party surfaces — win both classic search and AI citations. No AI-specific gimmicks are required; `llms.txt` is a 5-minute optional extra, not a strategy.

**Priority stack:** (1) real pages for studios/pricing/events/radio/residents → (2) JSON-LD entity graph + per-page meta/sitemap/robots → (3) Google Business Profile + review engine → (4) get listed on the aggregators AIs cite → (5) performance (25 MB of homepage JPGs) → (6) ongoing content + monitoring.

---

## 2. Evidence: current state

### 2.1 Technical audit (live site, verified 2026-07-02)

| Check | Status | Evidence |
|---|---|---|
| Server-rendered content | ✅ Good | Raw HTML (30.5 KB) contains all visible text; not a JS shell |
| Compression / protocol | ✅ Good | Brotli, HTTP/2 + HTTP/3, immutable hashed assets |
| `<h1>` (any heading) on homepage | ❌ None | All copy in `<button>`/`<span>`/`<div>` |
| Title tag | ⚠️ Weak | `Waterhouse Studios` — no keywords, no location |
| Meta description | ⚠️ Weak | Generic; no "Amsterdam", no "rent", no offer |
| `og:image` / `twitter:image` | ❌ Missing | `summary_large_image` card declared but renders blank |
| Canonical tags | ❌ Missing | Sitewide |
| JSON-LD structured data | ❌ None | No LocalBusiness/MusicVenue/Event/anything |
| `sitemap.xml` | ❌ 404 | robots.txt has no `Sitemap:` line either |
| `robots.txt` | ⚠️ Boilerplate | Only Cloudflare content-signals text; no rules, no sitemap |
| `llms.txt` | ❌ 404 | (Low priority — see §7.4) |
| HTTP → HTTPS redirect | ❌ Missing | `http://` serves 200 over plain HTTP |
| `www.` subdomain | ❌ Dead | No DNS record — connection failure, not a redirect |
| HSTS / security headers | ❌ Missing | On apex (subdomains partially have them) |
| `/booking` page meta | ❌ Missing | No title, description, OG tags |
| Hidden SEO text div | ⚠️ Risk | `SEOContent.svelte` = visually-hidden crawl text (cloaking-adjacent) |
| Homepage images | ❌ Critical | 8 gallery JPGs ≈ **25.4 MB** (largest 5.2 MB); no `srcset`, no WebP/AVIF, no width/height |
| Fonts | ⚠️ | Render-blocking Google Fonts (3 families) |
| `/twitch`, `/chat` pages | 🐛 Bug | Title/copy say "Redirecting to Google Reviews..." but redirect to Twitch |
| `/ade` page | ⚠️ Stale | "ADE 2025" content in mid-2026 |
| Twitch/radio embed | ❌ None | Stream is only an outbound link; no player, no schedule, no page |
| Dutch content / hreflang | ❌ None | `lang="en"` only; zero Dutch keywords for "muziekstudio huren amsterdam" |

### 2.2 Online footprint (verified 2026-07-02)

- **Brand queries:** official site ranks #1 — brand SEO is fine. But everything else on page 1 (RA, DICE, djguide) frames Waterhouse as a club, not a studio business.
- **Non-brand queries:** effectively zero visibility. Competitors that rank (Earforce, Jamstudios, Q-Factory, Nowhere, Already Made Studios, Amsterdam's Most Wanted) all have dedicated studio pages, visible pricing, and aggregator listings.
- **Most direct competitor:** Amsterdam's Most Wanted (NDSM) — same online-radio + DJ-studio-rental model, and they rank for it.
- **AI-citable surfaces:** Waterhouse is absent from Gearbooker, SoundBetter, ProStudioTime, Spacebase, Yelp; no Reddit mentions; no Wikipedia/Wikidata entity.
- **Strongest asset:** active Instagram (@waterhousestudiosamsterdam, ~1,040 followers) and a genuinely strong recurring Resident Advisor presence (ra.co/clubs/274196 — Techno Therapy "2YRS", PEGADA, Go Cosmic…).
- **Liabilities:** LinkedIn categorized "Real Estate," 5 followers; unclaimed-looking SoundCloud (`user-129476612`); brand-name collision with unrelated `@waterhousestudios` / `@waterhouse.studio` accounts; no surfaced Google reviews.

### 2.3 What 2026 best practice says (sources in §9)

- **Google (primary source, May 2026):** AI Overviews/AI Mode eligibility = indexed + snippet-eligible. No special files, markup, or chunking. What matters: people-first unique content, clear heading structure/semantic HTML, page experience, GBP for local, structured data for rich results. AI Mode uses **query fan-out** (~up to 16 parallel sub-queries) → cover the full topical cluster, not one keyword.
- **Citation studies (Profound, 5W, Princeton GEO follow-ups):** ChatGPT leans Wikipedia/encyclopedic; Perplexity leans Reddit + recency; YouTube and directories are recurring gatekeepers; only ~11% of domains get cited by both. Entity clarity + extractable structure (direct answers, stats, named entities) lifts citation rates 30–40%.
- **llms.txt:** ~408 fetches out of 500M+ AI-bot requests in one 90-day log study; Google explicitly says it's not needed. Ship a minimal one at most.
- **AI crawlers:** allow search/retrieval bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, Applebot) and user-fetch bots (ChatGPT-User, Claude-User, Perplexity-User); training bots (GPTBot, ClaudeBot, Google-Extended, CCBot) are a separate business decision — for maximum visibility, allow all.
- **Events:** Google event rich results now require **physical, publicly bookable events**; `offers.priceCurrency` required; one event per URL; date-only when time unknown. Online streams don't get the rich result but `BroadcastEvent`/`isLiveBroadcast` markup still feeds entity understanding.
- **Core Web Vitals (unchanged):** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75. INP is the most-failed metric industry-wide.

---

## 3. Phase 0 — Critical fixes & quick wins (≈1 day of work)

Everything here is low-effort, high-certainty, and independent of design decisions.

### 3.1 Infrastructure (Cloudflare / DNS — outside the repo)
- **Force HTTPS:** Cloudflare → SSL/TLS → Edge Certificates → "Always Use HTTPS" ON; enable HSTS after verifying.
- **Fix `www.`:** add a proxied DNS record for `www` + a Cloudflare redirect rule `www.waterhousestudios.nl/* → https://waterhousestudios.nl/$1` (301). A dead www loses type-in traffic and any links pointing at it.
- **Security headers** (Cloudflare Transform Rules or `_headers` if migrating hosts): `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

### 3.2 `static/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://waterhousestudios.nl/sitemap.xml
```
Explicitly allow-all (includes GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot, Applebot). Waterhouse wants maximum AI visibility and has nothing to protect; do **not** add AI-bot disallows.

### 3.3 Sitemap
Add `src/routes/sitemap.xml/+server.ts` with `export const prerender = true`, emitting all indexable routes with `<lastmod>`. Exclude redirect utility pages (`/twitch`, `/chat`, `/review-us`) and `/booking` form-only page if kept thin. Submit in Search Console + Bing Webmaster Tools.

### 3.4 Head hygiene (sitewide, in `+layout.svelte` / per page)
- **Canonical** on every page: `<link rel="canonical" href={`https://waterhousestudios.nl${page.url.pathname}`} />`.
- **`og:image` / `twitter:image`:** create a 1200×630 branded card (the `og-image` skill in this repo can generate it from the existing design system), place at `static/og.png`, reference with absolute URL. Per-page overrides for events.
- **Unique title + description per route.** Homepage title should carry the money keywords, e.g.:
  - Title: `Waterhouse Studios — Music Studio Rental, Events & Online Radio in Amsterdam`
  - Description: `25 acoustically designed music studios for rent in Amsterdam (Houthaven). Shared studios from €30/hr, private 24/7 studios, ateliers, live events and weekly online radio from Amsterdam's DJ community.`
- Recommended pattern (SvelteKit official): return SEO fields from each page's `load`, render once in root layout `<svelte:head>`.

### 3.5 Bug fixes
- `/twitch` and `/chat`: title + body copy say "Redirecting to Google Reviews..." — change to "Redirecting to Waterhouse Live Stream / Chat". Add `<meta name="robots" content="noindex">` to all three redirect utility pages (`/twitch`, `/chat`, `/review-us`) so they don't pollute the index.
- `/booking`: add title (`Book a Studio — Waterhouse Studios Amsterdam`), description, canonical.
- `/ade`: stale "ADE 2025" — either update toward ADE 2026 or convert to an archive page (see §6.3).

### 3.6 Remove the hidden-text hack
Delete `SEOContent.svelte` usage once Phase 1 pages exist (do it in the same release — don't remove the only crawlable copy before its replacement ships). Visually-hidden keyword text is exactly the pattern Google's spam policies describe as hidden text/cloaking; it's a liability, not an asset, and it's redundant once real pages exist.

---

## 4. Phase 1 — Content architecture: give the business indexable pages (the single biggest lever)

**Problem:** one URL cannot rank for "music studio rental amsterdam" *and* "dj events amsterdam" *and* "amsterdam online radio" *and* 15 artist names. Query fan-out (Google AI Mode) retrieves per-sub-query — a modal is retrievable for none of them.

**Principle:** keep the beloved drum-machine homepage as the brand experience. Add real pages underneath it. Modals can stay for the app-like feel, but each modal's content must also exist at a URL, and the machine's buttons should be crawlable links (`<a href="/studios">` styled as buttons) or at minimum the homepage must link to all pages in a crawlable footer/nav.

### 4.1 New route map

| Route | Purpose | Target queries | Primary content source |
|---|---|---|---|
| `/studios` | Studio rental sales page | music studio rental amsterdam, muziekstudio huren, production studio | ModalMusicStudio + ModalFacilities content |
| `/studios/pricing` (or section on `/studios`) | Transparent pricing | studio huren prijs, cheap music studio amsterdam | `constants-price.ts` + hourly bundles (€30/1h … €300/60h, Solo €1,100/mo) |
| `/ateliers` | Atelier/office rental | atelier huren amsterdam, creative workspace amsterdam | ModalOffice |
| `/residency` | The residency program + how to join | artist residency amsterdam, music residency | ModalOpportunities/benefits |
| `/residents` + `/residents/[slug]` | Artist roster; one page per resident (15+, growing) | each artist's name, "amsterdam dj X" | new; links to artists' IG/RA/SoundCloud |
| `/events` + `/events/[slug]` | Event listing + one page per event | events amsterdam, techno therapy, venue name + event | RA data / ade constants pattern |
| `/radio` (or `/live`) | Embedded Twitch player + schedule + show archive | amsterdam online radio, dj live stream amsterdam | ModalStream + Twitch embed |
| `/about` | Story, the building, the team, the "why" | brand queries, E-E-A-T | ModalAbout |
| `/contact` | NAP block, map, email, form | contact, directions | footer + ModalSendEmail |
| `/faq` | 10–15 real questions | "how much does it cost to rent…", "can I…" | new |

### 4.2 Content rules for every page (from Google's guide + GEO research)
- Exactly one `<h1>` containing the page's primary query phrasing; H2s phrased as questions where natural.
- **Lead with a direct, self-contained 40–60 word answer** ("Waterhouse Studios rents 25 acoustically designed music studios in Amsterdam's Houthaven, from €30/hour shared sessions to €1,100/month private 24/7 studios…") — this is what snippets and AI answers extract.
- **Specific numbers everywhere:** 25 studios, 15+ residents, 120-person event space, 24-bit/96 kHz, prices, address. Stats lift AI citation rates ~37–40% (Princeton GEO).
- Semantic HTML (`<main>`, `<nav>`, `<article>`), descriptive alt text, descriptive internal anchor text.
- Visible **"Last updated"** dates on pages that change.
- Written for humans in Waterhouse's voice — no keyword stuffing (it measurably *reduces* AI visibility).

### 4.3 Language strategy (decision needed)
The rental market searches in Dutch ("muziekstudio huren amsterdam") *and* English. Options:
- **A (recommended, pragmatic):** English site, but titles/descriptions/H2s on `/studios` naturally include Dutch key phrases, plus one Dutch-language section or FAQ entries. No hreflang complexity.
- **B (max reach, more work):** full `/nl` + `/en` with hreflang (self-referencing + reciprocal + x-default, sitemap alternates). Only do this with commitment to maintain both — thin machine translations site-wide can hurt more than help.

### 4.4 Homepage adjustments
- Add one styled `<h1>` (can look like the machine's brand strip): "Waterhouse Studios — Amsterdam music studios, events & online radio".
- Make "studios"/"ateliers" buttons real links to the new pages (modal can still open on JS click via progressive enhancement).
- Add a crawlable footer: links to all pages + full NAP (name, Danzigerkade 1, 1013 AP Amsterdam, email) — NAP must be byte-identical with GBP and schema.

---

## 5. Phase 2 — Structured data: the entity graph

No schema exists today. Implement JSON-LD (Google's only supported-everywhere format), injected via `<svelte:head>` from `load` data. Use one `@graph` with `@id` cross-links. Validate with Google Rich Results Test.

### 5.1 Site-wide (root layout): the venue entity
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicVenue",
      "@id": "https://waterhousestudios.nl/#venue",
      "name": "Waterhouse Studios",
      "description": "Music studio rental, artist residency, events and online radio in Amsterdam. 25 acoustically designed studios built by DJs and musicians for creators.",
      "url": "https://waterhousestudios.nl",
      "logo": "https://waterhousestudios.nl/logo.png",
      "image": "https://waterhousestudios.nl/og.png",
      "email": "info@waterhousestudios.nl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Danzigerkade 1",
        "postalCode": "1013 AP",
        "addressLocality": "Amsterdam",
        "addressCountry": "NL"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "…", "longitude": "…" },
      "sameAs": [
        "https://www.instagram.com/waterhousestudiosamsterdam",
        "https://www.twitch.tv/waterhousestudios",
        "https://www.youtube.com/@Waterhouse_Studios",
        "https://nl.linkedin.com/company/waterhouse-studios-amsterdam",
        "https://ra.co/clubs/274196",
        "https://dice.fm/venue/waterhouse-studios-3ovbv"
      ]
    }
  ]
}
```
`sameAs` linking GBP/socials/RA/Wikidata is the cheapest strong entity-confidence signal for AI search. Add Wikidata QID once created (§7.3).

### 5.2 Per-page additions
- **`/studios` & `/ateliers`:** `Service` (or `Product`) nodes with `Offer`s — every tier priced in EUR (`priceCurrency: "EUR"`), `availability`, linked `provider` → `#venue`. Transparent machine-readable pricing is also what AI buying agents need.
- **`/events/[slug]`:** `MusicEvent` — required: `name`, `startDate` (date-only if time unknown — never fake `T00:00:00`), `location` → `#venue` with full address, `offers` incl. `price` + `priceCurrency` + `url` + `availability`, `performer` (Person/MusicGroup), `organizer` → `#venue`, `image`. One event per URL. Physical + publicly bookable events are eligible for Google's event experience; mark only real events.
- **`/radio`:** `RadioBroadcastService`/`RadioStation` entity + each scheduled show as `BroadcastEvent` with `isLiveBroadcast: true`, `startDate`/`endDate`, `publishedOn`. (No rich result for online-only events since the 2025 policy change — the value is entity understanding and AI extraction.) Archived sets as `VideoObject`.
- **`/residents/[slug]`:** `Person` or `MusicGroup` with `sameAs` to the artist's Instagram/SoundCloud/RA/Spotify — this is how LLMs learn "X is a resident at Waterhouse Studios."
- **`/faq`:** `FAQPage` markup mirroring visible Q&A.
- **`/about`:** `Organization` + founder `Person`s (E-E-A-T: named people with real bios).

---

## 6. Phase 3 — Performance (Core Web Vitals)

Targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (p75, unchanged in 2026).

1. **Gallery images (critical):** 25.4 MB of JPGs on the homepage.
   - Adopt `@sveltejs/enhanced-img` (or vite-imagetools): AVIF/WebP, responsive `srcset`, intrinsic `width`/`height` (also fixes CLS). Budget: ≤ 150 KB per displayed image.
   - Keep `loading="lazy"` (already present); add `fetchpriority="high"` to the LCP element only.
2. **Fonts:** self-host Jersey 15 / Ovo / Sigmar via Fontsource with `font-display: swap` — removes the render-blocking Google Fonts request chain and third-party dependency.
3. **Videos:** `screen.mp4` (198 KB) is fine; ensure `preload="metadata"` + `poster`. `broll.mp4` (19 MB) and `tour.mp4` (16 MB) must never load eagerly — load modal videos on interaction only; consider hosting on YouTube (also a citable surface, §7.3).
4. **INP:** the homepage hydrates a lot of interactive chrome (knobs, faders, Three.js turntable). Profile with Chrome DevTools; lazy-import Threlte/Three components (`await import(...)` on interaction/viewport) so they don't sit in the critical bundle.
5. **Verify in the field:** PageSpeed Insights + Search Console CWV report once GSC is set up.

---

## 7. Phase 4 — Off-site: local SEO, directories, and the surfaces LLMs cite

This is where the "AI reach" battle is actually won: brands are ~6.5× more likely to be cited via third-party sources than their own domain.

### 7.1 Google Business Profile (highest local ROI)
A review link exists (`g.page/r/CX-2DOpGDJ9YEAE/review`) so a profile exists — but no reviews surface in search.
- Verify ownership; complete **every** field. **Primary category:** "Recording studio" (matches the rental business — the biggest single local ranking lever). Secondary: "Live music venue", "Event venue".
- Byte-identical NAP with site footer + schema. Accurate opening hours (Google boosts accurate-hours businesses in AI/local results).
- **Review engine:** the `/review-us` redirect already exists — put its QR code at the studio exit, in booking-confirmation emails, and after events. Steady velocity beats bursts; respond to every review within ~48 h.
- Weekly Google Posts (events are perfect content); refresh photos monthly.
- GBP now feeds Google AI Overviews and Gemini/"Ask Maps" for local queries directly.

### 7.2 Fix broken/weak profiles
- **LinkedIn:** change industry from "Real Estate" to Music/Entertainment; real description with keywords.
- **SoundCloud:** claim/brand the `user-129476612` account or create an official one.
- **Handle collision:** the canonical handle is `@waterhousestudiosamsterdam`; use it consistently in every profile's name/bio and interlink all profiles (each bio links the site; site `sameAs` links each profile) so engines disambiguate from unrelated "Waterhouse" accounts.

### 7.3 Get onto the surfaces AI assistants cite (currently: none)
Priority order:
1. **Studio-rental aggregators** — Gearbooker, ProStudioTime, SoundBetter, Spacebase (competitor Already Made Studios is there). These dominate "studio rental amsterdam" answers in LLMs.
2. **Event platforms** — RA is already strong (keep it rich and current); add Songkick/Bandsintown; keep DICE current.
3. **YouTube** — upload stream highlights/recorded sets with entity-rich titles ("[Artist] live at Waterhouse Studios Amsterdam"). YouTube is a recurring AI citation gatekeeper and Google AI Overviews source.
4. **Wikidata** — create an item (music venue, Amsterdam, founded 2024, official site, social links). Low effort, feeds every knowledge graph. A Wikipedia *article* requires independent press notability — pursue press first (local: Het Parool, 3voor12, Subbacultcha, DJ Mag NL) and revisit.
5. **Reddit** — authentic participation only (r/Amsterdam, r/DJs, r/WeAreTheMusicMakers, r/techno): answer "where can I produce/practice in Amsterdam" questions honestly. Perplexity leans heavily on Reddit + recency. Never astroturf — inauthentic mentions are the fastest way to poison the brand.
6. **Local press / listicles** — pitch "best music studios in Amsterdam" roundups and Amsterdam culture blogs; comparison/listicle content is the #1 most-cited content type in AI answers (~33%).

### 7.4 Machine-readable extras (cheap, optional)
- **`static/llms.txt`:** minimal markdown index (what Waterhouse is, address, links to /studios /pricing /events /radio). ~15 minutes; near-zero measured consumption, but harmless. Do not invest beyond that.
- **`static/pricing.md`:** plain-markdown pricing table mirroring `/studios/pricing` for AI buying agents. Keep in sync with `constants-price.ts` (generate at build time so it can't drift).

---

## 8. Phase 5 — Events & radio as ongoing SEO engines

The recurring event series and stream are Waterhouse's renewable content assets — competitors renting rooms have nothing like them.

1. **Event pages as a habit:** every event gets `/events/[slug]` at announce time (schema per §5.2), linked from the RA/DICE listing (reverse too). After the event, append photos/lineup recap — the page becomes a permanent long-tail asset ("[artist] Amsterdam 2026").
2. **`/radio` page:** embed the Twitch player (`player.twitch.tv` iframe with `parent=waterhousestudios.nl`) + published weekly schedule + resident show descriptions. Target "amsterdam online radio", "live dj streams amsterdam" — queries the direct competitor (Amsterdam's Most Wanted) currently owns.
3. **ADE:** make `/ade` evergreen (`ADE at Waterhouse Studios`) with per-year archives (`/ade/2025`, `/ade/2026`). ADE queries spike every October; a stale 2025 page wastes that.
4. **Residency flywheel:** each new resident = a new `/residents/[slug]` page + Instagram cross-post + `performer` links from their events. 15+ residents ≈ 15+ entity pages that all reference Waterhouse.

---

## 9. Phase 6 — Measurement

| What | Tool | Cadence |
|---|---|---|
| Index coverage, queries, CWV, rich results | Google Search Console (verify domain, submit sitemap) — note: AI Overview traffic is folded into normal "Web" data, not separable | Weekly glance |
| Bing/Copilot | Bing Webmaster Tools + sitemap | Monthly |
| AI citation check | Manual: run ~15 queries ("music studio rental amsterdam", "muziekstudio huren", "best place to record in amsterdam", "amsterdam online radio", "techno events amsterdam tonight", brand queries) through ChatGPT, Perplexity, Google AI Mode; log who gets cited | Monthly |
| AI referral traffic | Analytics segment for referrers `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com` (PostHog is already in the stack) | Monthly |
| Reviews | GBP review count/rating | Monthly |
| Baseline now, before changes ship | site:waterhousestudios.nl count, current GSC screenshot, current AI answers for the 15 queries | Once, first |

**Success criteria (6 months):** ranking on page 1 for ≥3 non-brand Dutch/English rental queries; cited by at least one AI engine for an Amsterdam studio-rental query; ≥25 Google reviews at ≥4.5★; all CWV green in field data; listed on ≥3 rental aggregators.

---

## 10. Prioritized roadmap

| # | Work item | Impact | Effort | Section |
|---|---|---|---|---|
| 1 | robots.txt + sitemap + canonicals + og:image + per-page meta + redirect-page bugfixes | High | ~1 day | §3 |
| 2 | Cloudflare: HTTPS redirect, www record, HSTS | High | ~1 h | §3.1 |
| 3 | `/studios` + pricing page (the money page) | Very high | 1–2 days | §4 |
| 4 | Venue JSON-LD graph + Offer schema | High | ~1 day | §5 |
| 5 | Google Business Profile optimization + review engine | Very high (local) | ~½ day + ongoing | §7.1 |
| 6 | Remaining pages: /events, /radio, /about, /residency, /residents, /faq, /contact + remove hidden-text div | Very high | ~1 week | §4 |
| 7 | Event + BroadcastEvent + Person schema on new pages | High | with #6 | §5.2 |
| 8 | Image pipeline (enhanced-img) + self-hosted fonts + lazy Three.js | Medium-high | 1–2 days | §6 |
| 9 | Aggregator listings (Gearbooker, ProStudioTime, SoundBetter, Spacebase) | High (AI reach) | ~1 day forms + ongoing | §7.3 |
| 10 | LinkedIn/SoundCloud fixes, Wikidata item, YouTube upload habit | Medium | ~½ day + ongoing | §7.2–7.3 |
| 11 | llms.txt + pricing.md | Low | ~½ h | §7.4 |
| 12 | GSC/Bing setup + baseline + monthly AI-visibility log | Enabler | ~2 h + monthly | §9 |
| 13 | Dutch-language strategy decision (option A vs B) | Medium | varies | §4.3 |
| 14 | Press outreach → future Wikipedia eligibility | Medium (slow burn) | ongoing | §7.3 |

---

## 11. Sources

- Google, *Optimizing your website for generative AI features on Google Search* (May 2026): developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google, *AI features and your website*: developers.google.com/search/docs/appearance/ai-features
- Google, *Event structured data*: developers.google.com/search/docs/appearance/structured-data/event
- Google, *LocalBusiness structured data*: developers.google.com/search/docs/appearance/structured-data/local-business
- SvelteKit SEO docs: svelte.dev/docs/kit/seo
- Princeton GEO study (KDD 2024) + 2026 follow-ups; Profound *AI platform citation patterns*; 5W Research citation-share study (PRNewswire)
- llms.txt status: presenc.ai *State of llms.txt 2026*; okara.ai; searchsignal.online
- AI crawler landscape: nohacks.co (2026 user-agent reference); anagram.ai; scrunch.com
- Local SEO 2026: PinMeTo GBP playbook; Connection Model local-SEO/AI checklist
- CWV: support.google.com/webmasters/answer/9205520 (thresholds unchanged; "LCP lowered to 2.0s" claims are unverified rumor)
- Field evidence: live-site crawl + repo audit, 2026-07-02/03 (this repo, `docs/SEO_SPEC.md` §2)
