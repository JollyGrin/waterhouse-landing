<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SITE, LINKS } from '$lib/site';
</script>

<Seo
	title="Contact & Location"
	description="Contact Waterhouse Studios Amsterdam. Find us at Danzigerkade 1, 1013 AP Amsterdam (Houthaven), email info@waterhousestudios.nl, or book a studio online."
/>
<JsonLd schema={graph(breadcrumb([{ name: 'Contact', path: '/contact' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto max-w-4xl px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / Contact
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">Contact & location</h1>

		<p class="mb-10 max-w-3xl text-xl leading-relaxed">
			Waterhouse Studios is in Amsterdam's Houthaven. Email us, drop by, or book a studio online — we'd
			love to show you the space.
		</p>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="border-secondary rounded-lg border-2 bg-white p-6" style="box-shadow: 6px 6px 0 black;">
				<h2 class="mb-3 text-3xl">Visit us</h2>
				<address class="space-y-1 text-lg not-italic">
					<div>{SITE.name}</div>
					<div>{SITE.address.street}</div>
					<div>{SITE.address.postalCode} {SITE.address.city}</div>
					<div>The Netherlands</div>
				</address>
				<a href={LINKS.maps} target="_blank" rel="noopener" class="hover:text-amber mt-3 inline-block text-lg underline">Open in Google Maps →</a>
			</div>

			<div class="border-secondary rounded-lg border-2 bg-white p-6" style="box-shadow: 6px 6px 0 black;">
				<h2 class="mb-3 text-3xl">Get in touch</h2>
				<ul class="space-y-2 text-lg">
					<li>Email: <a href="mailto:{SITE.email}" class="hover:text-amber underline">{SITE.email}</a></li>
					<li>Instagram: <a href={LINKS.instagram} target="_blank" rel="noopener" class="hover:text-amber underline">@waterhousestudiosamsterdam</a></li>
					<li>Twitch: <a href={LINKS.twitch} target="_blank" rel="noopener" class="hover:text-amber underline">waterhousestudios</a></li>
				</ul>
				<a href="/booking" class="midi bg-amber mt-5 inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 black;">Book a studio</a>
			</div>
		</div>

		<div class="mt-8">
			<a href={LINKS.reviews} target="_blank" rel="noopener" class="hover:text-amber text-lg underline">Leave us a Google review →</a>
		</div>
	</div>
</main>

<SiteFooter />
