<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SITE, LINKS } from '$lib/site';
</script>

<Seo
	title="Events at Waterhouse Studios Amsterdam"
	image="/og/events.png"
	description="Waterhouse Studios hosts club nights, showcases and live events for up to {SITE.facts.eventCapacity} people in Amsterdam's Houthaven. Find our lineups on Resident Advisor and DICE, and catch every set live on the stream."
/>
<JsonLd schema={graph(breadcrumb([{ name: 'Events', path: '/events' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / Events
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">Events in Amsterdam</h1>

		<p class="mb-8 max-w-3xl text-xl leading-relaxed">
			Waterhouse Studios is a music venue and event space in Amsterdam's Houthaven with capacity for
			up to {SITE.facts.eventCapacity} people. We host club nights, label showcases and artist
			showcases — including recurring resident series — and broadcast many of them live on Waterhouse
			Radio.
		</p>

		<section class="mb-12 grid gap-6 md:grid-cols-2">
			<a
				href={LINKS.residentAdvisor}
				target="_blank"
				rel="noopener"
				class="border-secondary rounded-lg border-2 bg-white p-6 transition-all hover:-translate-y-1"
				style="box-shadow: 6px 6px 0 black;"
			>
				<h2 class="text-3xl">Upcoming lineups →</h2>
				<p class="mt-2 text-lg opacity-80">
					See our full event calendar and grab tickets on Resident Advisor.
				</p>
			</a>
			<a
				href={LINKS.dice}
				target="_blank"
				rel="noopener"
				class="border-secondary rounded-lg border-2 bg-white p-6 transition-all hover:-translate-y-1"
				style="box-shadow: 6px 6px 0 black;"
			>
				<h2 class="text-3xl">Tickets on DICE →</h2>
				<p class="mt-2 text-lg opacity-80">Find and book Waterhouse events on DICE.</p>
			</a>
		</section>

		<section class="mb-12">
			<h2 class="mb-4 text-4xl">Past events & archives</h2>
			<ul class="space-y-2 text-xl">
				<li>
					<a href="/ade" class="hover:text-amber underline">ADE — Waterhouse Stream Marathon</a>
					<span class="opacity-60">— our Amsterdam Dance Event programme</span>
				</li>
			</ul>
		</section>

		<section class="border-secondary bg-secondary text-primary rounded-lg border-2 p-8 text-center">
			<h2 class="mb-3 text-4xl">Host your event here</h2>
			<p class="mb-6 text-xl opacity-80">
				A {SITE.facts.eventCapacity}-capacity space with a full sound and streaming setup.
			</p>
			<a href="/contact" class="midi bg-amber inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 white;">Enquire about events</a>
		</section>
	</div>
</main>

<SiteFooter />
