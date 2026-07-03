<script lang="ts">
	import { SITE, LINKS, NAV } from '$lib/site';
	import IconInstagram from '$lib/icon/IconInstagram.svelte';
	import IconTwitch from '$lib/icon/IconTwitch.svelte';

	const year = 2026;
</script>

<footer class="font-jersey border-secondary mt-16 border-t-2 bg-black text-slate-200">
	<div class="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
		<div class="md:col-span-2">
			<img src="/logo.png" width="160" height="40" alt="Waterhouse Studios" class="mb-3" />
			<p class="max-w-sm text-sm opacity-70">
				{SITE.facts.studioCount} acoustically designed music studios, ateliers, an artist residency,
				live events and 24/7 online radio — built by DJs and musicians for creators in Amsterdam.
			</p>
		</div>

		<nav aria-label="Footer">
			<h2 class="mb-2 text-lg">Explore</h2>
			<ul class="space-y-1 text-sm opacity-80">
				{#each NAV as item (item.href)}
					<li><a href={item.href} class="hover:text-amber transition-colors">{item.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div>
			<h2 class="mb-2 text-lg">Visit</h2>
			<address class="space-y-1 text-sm not-italic opacity-80">
				<div>{SITE.name}</div>
				<div>{SITE.address.street}</div>
				<div>{SITE.address.postalCode} {SITE.address.city}</div>
				<div>The Netherlands</div>
				<div>
					<a href="mailto:{SITE.email}" class="hover:text-amber underline">{SITE.email}</a>
				</div>
				<div>
					<a href={LINKS.maps} target="_blank" rel="noopener" class="hover:text-amber underline">
						Directions
					</a>
				</div>
			</address>
			<div class="mt-3 flex items-center gap-3">
				<a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram">
					<IconInstagram w={22} />
				</a>
				<a href={LINKS.twitch} target="_blank" rel="noopener" aria-label="Twitch">
					<IconTwitch w={22} />
				</a>
			</div>
		</div>
	</div>

	<div
		class="border-t border-white/10 px-4 py-4 text-center text-xs opacity-50"
	>
		© {year} {SITE.name} · Made in Amsterdam ·
		<a href="/privacy" class="hover:text-amber underline">Privacy</a> ·
		<a href="/terms" class="hover:text-amber underline">Terms</a>
	</div>
</footer>
