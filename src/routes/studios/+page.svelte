<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, studioServiceSchema, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SITE, PRICING, LINKS } from '$lib/site';

	const facilities = [
		{
			title: 'Recording',
			items: ['Pro microphones', 'Acoustic treatment', 'Multiple rooms']
		},
		{
			title: 'Production',
			items: ['Mixing consoles', 'MIDI equipment', 'Monitor speakers']
		},
		{
			title: 'Stream room',
			items: ['4K cameras', 'Pro lighting', 'CDJs + mixer', 'Broadcast mic']
		}
	];
</script>

<Seo
	title="Music Studio Rental in Amsterdam — Waterhouse Studios"
	image="/og/studios.png"
	description="Rent a music studio in Amsterdam. {SITE.facts.studioCount} acoustically designed studios in the Houthaven — shared sessions from €{PRICING.sharedHourly}/hour, private 24/7 solo studios €{PRICING.soloMonthly}/month. Recording, production and streaming, {SITE.facts.audio}."
/>
<JsonLd schema={graph(studioServiceSchema(), breadcrumb([{ name: 'Studios', path: '/studios' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / Studios
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">Music studio rental in Amsterdam</h1>

		<p class="mb-8 max-w-3xl text-xl leading-relaxed">
			Waterhouse Studios rents {SITE.facts.studioCount} acoustically designed music studios in Amsterdam's
			Houthaven, from €{PRICING.sharedHourly}/hour shared sessions to €{PRICING.soloMonthly}/month private
			24/7 studios. Each room is custom-designed by industry professionals for recording, producing,
			mixing and streaming at {SITE.facts.audio} — built by creators, for creators.
		</p>

		<div class="mb-12 flex flex-wrap gap-4">
			<a
				href="/booking"
				class="midi bg-amber inline-block px-8 py-3 text-2xl text-black"
				style="box-shadow: 4px 4px 0 black;">Book a studio</a
			>
			<a
				href="/contact"
				class="midi bg-primary inline-block px-8 py-3 text-2xl"
				style="box-shadow: 4px 4px 0 black;">Ask a question</a
			>
		</div>

		<!-- Pricing -->
		<section class="mb-16">
			<h2 class="mb-6 text-4xl">Studio pricing</h2>
			<div class="grid gap-6 md:grid-cols-3">
				<div class="border-secondary rounded-lg border-2 bg-white p-6" style="box-shadow: 6px 6px 0 black;">
					<h3 class="text-3xl">Shared Studio</h3>
					<p class="mb-4 opacity-70">Perfect for emerging artists</p>
					<p class="text-5xl">€{PRICING.sharedHourly}<span class="text-lg opacity-60">/hour</span></p>
					<ul class="mt-4 space-y-1 text-lg">
						{#each PRICING.sharedBundles as bundle (bundle.hours)}
							<li>{bundle.hours} hours — €{bundle.price}</li>
						{/each}
						<li>Shared workspace + equipment</li>
						<li>Stream-room access</li>
					</ul>
				</div>
				<div class="border-secondary bg-amber/10 rounded-lg border-2 p-6" style="box-shadow: 6px 6px 0 black;">
					<h3 class="text-3xl">Solo Studio</h3>
					<p class="mb-4 opacity-70">Your private creative space</p>
					<p class="text-5xl">€{PRICING.soloMonthly}<span class="text-lg opacity-60">/month</span></p>
					<ul class="mt-4 space-y-1 text-lg">
						<li>24/7 private access</li>
						<li>Storage space</li>
						<li>Premium equipment</li>
						<li>Stream-room access</li>
					</ul>
				</div>
				<div class="border-secondary rounded-lg border-2 bg-white p-6" style="box-shadow: 6px 6px 0 black;">
					<h3 class="text-3xl">Atelier</h3>
					<p class="mb-4 opacity-70">For artists & industry pros</p>
					<p class="text-5xl">€{PRICING.atelierMonthly}<span class="text-lg opacity-60">/month</span></p>
					<ul class="mt-4 space-y-1 text-lg">
						<li>Meeting-room access</li>
						<li>Business amenities</li>
						<li>Stream-room access</li>
					</ul>
					<a href="/ateliers" class="hover:text-amber mt-3 inline-block underline">More about ateliers →</a>
				</div>
			</div>
		</section>

		<!-- Facilities -->
		<section class="mb-16">
			<h2 class="mb-6 text-4xl">Equipment & facilities</h2>
			<p class="mb-6 max-w-3xl text-lg">
				Our fully equipped studios are designed for recording, mixing and producing, and every plan
				includes access to the stream room for Twitch and YouTube broadcasts.
			</p>
			<div class="grid gap-6 md:grid-cols-3">
				{#each facilities as group (group.title)}
					<div class="border-secondary rounded-lg border-2 bg-white p-6">
						<h3 class="border-secondary mb-3 border-b-2 text-2xl">{group.title}</h3>
						<ul class="space-y-1 text-lg">
							{#each group.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<section class="border-secondary bg-secondary text-primary rounded-lg border-2 p-8 text-center">
			<h2 class="mb-3 text-4xl">Ready to create?</h2>
			<p class="mb-6 text-xl opacity-80">
				Join the Waterhouse community of {SITE.facts.residentCount}+ resident artists in Amsterdam.
			</p>
			<a href="/booking" class="midi bg-amber inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 white;">Book your studio</a>
		</section>
	</div>
</main>

<SiteFooter />
