<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, faqSchema, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';

	// Visible content and FAQPage schema are generated from the same list so they
	// never drift (a requirement for valid FAQ rich results).
	const faqs = [
		{
			q: 'How much does it cost to rent a music studio in Amsterdam?',
			a: 'At Waterhouse Studios, shared studios start at €30 per hour, with bundles of 10 hours for €150, 20 hours for €200, 40 hours for €250 and 60 hours for €300. A private 24/7 solo studio is €1,100 per month, and an atelier is €500 per month. Every plan includes stream-room access.'
		},
		{
			q: 'Where is Waterhouse Studios located?',
			a: 'Waterhouse Studios is at Danzigerkade 1, 1013 AP Amsterdam, in the Houthaven district on the western harbour.'
		},
		{
			q: 'What equipment is in the studios?',
			a: 'The studios are fully equipped for recording, mixing and producing — professional microphones, acoustic treatment, mixing consoles, MIDI equipment and monitor speakers, running at 24-bit / 96 kHz. There is also a dedicated stream room with CDJs, a mixer, broadcast mic, 4K cameras and pro lighting.'
		},
		{
			q: 'Can I livestream from Waterhouse Studios?',
			a: 'Yes. Every studio and atelier membership includes access to the stream room, a full DJ rig built for broadcasting live to Twitch and YouTube. We run Waterhouse Radio, a 24/7 online stream of Amsterdam DJs and artists.'
		},
		{
			q: 'What is the Waterhouse artist residency?',
			a: 'The residency is an artist-development programme for our 15+ resident DJs, producers and musicians, offering workshops, mentorship, performance opportunities and help finding paid work through partnerships with local venues and platforms.'
		},
		{
			q: 'Can I host an event at Waterhouse Studios?',
			a: 'Yes. Waterhouse is a music venue and event space with capacity for up to 120 people, with a full sound and streaming setup. Contact us at info@waterhousestudios.nl to enquire.'
		},
		{
			q: 'How do I book a studio?',
			a: 'Use the booking form on our website or email info@waterhousestudios.nl. Existing members can reserve time through the members app.'
		}
	];
</script>

<Seo
	title="Frequently Asked Questions"
	description="Answers about renting a music studio in Amsterdam at Waterhouse Studios — pricing, location, equipment, streaming, the residency and hosting events."
/>
<JsonLd schema={graph(faqSchema(faqs), breadcrumb([{ name: 'FAQ', path: '/faq' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto max-w-3xl px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / FAQ
		</nav>

		<h1 class="mb-8 text-5xl md:text-7xl">Frequently asked questions</h1>

		<div class="space-y-6">
			{#each faqs as item (item.q)}
				<div class="border-secondary rounded-lg border-2 bg-white p-6">
					<h2 class="mb-2 text-2xl">{item.q}</h2>
					<p class="text-lg leading-relaxed">{item.a}</p>
				</div>
			{/each}
		</div>

		<div class="mt-10 text-center">
			<a href="/contact" class="midi bg-amber inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 black;">Still have a question?</a>
		</div>
	</div>
</main>

<SiteFooter />
