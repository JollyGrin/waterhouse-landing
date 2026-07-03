<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SITE } from '$lib/site';
</script>

<Seo
	title="About Waterhouse Studios Amsterdam"
	image="/og/about.png"
	description="Waterhouse Studios is a music studio, artist residency, event space and online radio in Amsterdam's Houthaven — {SITE.facts.studioCount} acoustically designed studios built by DJs and musicians for creators."
/>
<JsonLd schema={graph(breadcrumb([{ name: 'About', path: '/about' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto max-w-4xl px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / About
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">A space crafted for music creators</h1>

		<p class="mb-6 text-xl leading-relaxed">
			Waterhouse Studios is a launchpad built by DJs and musicians for creators in Amsterdam's
			Houthaven. Everything we offer is tailored to the needs of music creators and the people working
			in the music industry: {SITE.facts.studioCount} acoustically designed studios, ateliers, an
			artist residency, an event space for up to {SITE.facts.eventCapacity} people, and a weekly online
			radio stream — all in one place.
		</p>

		<div class="space-y-10 text-lg leading-relaxed">
			<section>
				<h2 class="mb-3 text-3xl">Why Waterhouse Studios?</h2>
				<p class="mb-3">
					What sets Waterhouse apart is the combination of world-class facilities, comprehensive
					artist-development resources, and a vibrant community — all under one roof. We're more than
					a studio; we're a partner in your creative journey.
				</p>
				<ul class="ml-4 list-disc space-y-2">
					<li>
						<strong>For up-and-coming artists:</strong> a launchpad to refine your skills, build your
						online presence and get the opportunities you need to break into the industry.
					</li>
					<li>
						<strong>For established artists:</strong> a place to experiment with new ideas, collaborate
						with fresh talent and reach new audiences.
					</li>
				</ul>
			</section>

			<section>
				<h2 class="mb-3 text-3xl">A vibrant community</h2>
				<p>
					At the heart of Waterhouse is a thriving community of creatives who share a passion for
					innovation and artistic excellence — a supportive network of peers and mentors as invested
					in your success as you are. Whether you're jamming in the studio, streaming to a global
					audience or performing on stage, you're part of a dynamic, inspiring environment.
				</p>
			</section>

			<section>
				<h2 class="mb-3 text-3xl">Built by creators, for creators</h2>
				<p>
					Our studios are custom-designed by industry professionals for optimal acoustics and
					workflow at {SITE.facts.audio}. Come and see the space — find us at {SITE.address.street},
					{SITE.address.postalCode} {SITE.address.city}.
				</p>
			</section>
		</div>

		<div class="mt-10 flex flex-wrap gap-4">
			<a href="/studios" class="midi bg-amber inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 black;">Rent a studio</a>
			<a href="/contact" class="midi bg-primary inline-block px-8 py-3 text-2xl" style="box-shadow: 4px 4px 0 black;">Get in touch</a>
		</div>
	</div>
</main>

<SiteFooter />
