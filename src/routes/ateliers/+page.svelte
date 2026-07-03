<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, atelierServiceSchema, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { PRICING } from '$lib/site';
</script>

<Seo
	title="Atelier & Creative Office Rental in Amsterdam"
	description="Rent an atelier at Waterhouse Studios Amsterdam — a creative office for artists and music-industry professionals. €{PRICING.atelierMonthly}/month with 24/7 access, meeting rooms, business amenities and stream-room access."
/>
<JsonLd schema={graph(atelierServiceSchema(), breadcrumb([{ name: 'Ateliers', path: '/ateliers' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / Ateliers
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">Ateliers for artists & music professionals</h1>

		<p class="mb-8 max-w-3xl text-xl leading-relaxed">
			Waterhouse Studios rents ateliers — creative office spaces for artists, managers, labels and
			other music-industry professionals — in Amsterdam's Houthaven for €{PRICING.atelierMonthly}/month.
			Get a dedicated base with 24/7 access, meeting-room and business amenities, and full access to
			the stream room, all inside a working community of musicians and DJs.
		</p>

		<div class="mb-12 grid gap-8 md:grid-cols-2">
			<div class="border-secondary rounded-lg border-2 bg-white p-6" style="box-shadow: 6px 6px 0 black;">
				<h2 class="text-3xl">Atelier</h2>
				<p class="mb-4 opacity-70">For artists & industry professionals — 24/7 access</p>
				<p class="text-6xl">€{PRICING.atelierMonthly}<span class="text-lg opacity-60">/month</span></p>
				<ul class="mt-4 space-y-1 text-lg">
					<li>Meeting-room access</li>
					<li>Business amenities</li>
					<li>Stream-room access</li>
					<li>Part of the Waterhouse creative community</li>
				</ul>
			</div>
			<div class="border-secondary bg-secondary text-primary flex flex-col justify-center rounded-lg border-2 p-8">
				<h2 class="mb-3 text-3xl">A base inside the studio</h2>
				<p class="mb-6 text-lg opacity-80">
					Ateliers sit alongside the music studios, so you're steps from the people you collaborate
					with — producers, DJs and creators building their careers in Amsterdam.
				</p>
				<a href="/booking" class="midi bg-amber inline-block px-8 py-3 text-center text-2xl text-black" style="box-shadow: 4px 4px 0 white;">Enquire about an atelier</a>
			</div>
		</div>

		<p class="text-lg">
			Looking for a room to make music instead? See <a href="/studios" class="hover:text-amber underline">studio rental & pricing</a>.
		</p>
	</div>
</main>

<SiteFooter />
