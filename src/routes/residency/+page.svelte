<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { SITE } from '$lib/site';

	const programs = [
		{
			title: 'Workshops',
			body: 'Learn the ins and outs of music production, online promotion and content creation from industry experts.'
		},
		{
			title: 'Mentorship',
			body: 'Get personalised guidance from seasoned professionals who understand the challenges and opportunities of the music world.'
		},
		{
			title: 'Performance',
			body: 'Showcase your talents at our regular events and artist showcases, performing for live audiences and connecting with industry insiders.'
		}
	];

	const support = [
		{ title: 'Performance', body: 'Club performances, festival appearances and local events across Amsterdam.' },
		{ title: 'Collaborations', body: 'Work with other artists, producers and creatives to expand your network and portfolio.' },
		{ title: 'Exposure', body: 'Grow your fanbase through streaming, social media and live performances.' },
		{ title: 'Government support', body: 'We help artists apply for subsidies to fund their projects, guiding you every step of the way.' }
	];
</script>

<Seo
	title="Artist Residency in Amsterdam"
	description="The Waterhouse Studios artist residency in Amsterdam is a launchpad for {SITE.facts.residentCount}+ resident DJs, producers and musicians — workshops, mentorship, performances, and help finding paid work."
/>
<JsonLd schema={graph(breadcrumb([{ name: 'Residency', path: '/residency' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / Residency
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">A launchpad for your career</h1>

		<p class="mb-8 max-w-3xl text-xl leading-relaxed">
			Waterhouse Studios is home to a growing artist residency of {SITE.facts.residentCount}+ DJs,
			producers and musicians in Amsterdam. We're not just a space to create — we help artists grow
			professionally, connect with opportunities and thrive in the industry through workshops,
			mentorship, performances and a supportive creative community.
		</p>

		<section class="mb-16">
			<h2 class="mb-6 text-4xl">Artist development</h2>
			<div class="grid gap-6 md:grid-cols-3">
				{#each programs as p (p.title)}
					<div class="border-secondary rounded-lg border-2 bg-white p-6">
						<h3 class="border-secondary mb-3 border-b-2 border-dotted text-2xl">{p.title}</h3>
						<p class="text-lg leading-relaxed">{p.body}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="mb-16">
			<h2 class="mb-6 text-4xl">Helping you get work</h2>
			<p class="mb-6 max-w-3xl text-lg">
				Breaking into the industry is tough, so we help residents find work as DJs, sound designers
				and musicians through strategic partnerships with local venues and online platforms.
			</p>
			<div class="grid gap-6 md:grid-cols-2">
				{#each support as s (s.title)}
					<div class="border-secondary rounded-lg border-2 bg-white p-6">
						<h3 class="border-secondary mb-2 border-b-2 border-dotted text-2xl">{s.title}</h3>
						<p class="text-lg">{s.body}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="border-secondary bg-secondary text-primary rounded-lg border-2 p-8 text-center">
			<h2 class="mb-3 text-4xl">Join the residency</h2>
			<p class="mb-6 text-xl opacity-80">Tell us about yourself and what you're building.</p>
			<a href="/booking" class="midi bg-amber inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 white;">Apply / join the waiting list</a>
		</section>
	</div>
</main>

<SiteFooter />
