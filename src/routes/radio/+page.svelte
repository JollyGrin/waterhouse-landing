<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import JsonLd from '$lib/seo/JsonLd.svelte';
	import { graph, radioStationSchema, breadcrumb } from '$lib/seo/schema';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { LINKS } from '$lib/site';

	// Twitch embeds require the host domain(s) as `parent`. Localhost is included
	// so the player also loads during local preview.
	const parents = ['waterhousestudios.nl', 'localhost'];
	const embedSrc =
		`https://player.twitch.tv/?channel=waterhousestudios&muted=true&` +
		parents.map((p) => `parent=${p}`).join('&');
</script>

<Seo
	title="Waterhouse Radio — Live Online DJ Streams from Amsterdam"
	image="/og/radio.png"
	description="Waterhouse Radio broadcasts live DJ sets and shows from Amsterdam artists every week. Watch the stream from the Waterhouse Studios stream room on Twitch."
/>
<JsonLd schema={graph(radioStationSchema(), breadcrumb([{ name: 'Radio', path: '/radio' }]))} />

<SiteHeader />

<main class="bg-primary text-secondary font-jersey">
	<div class="container mx-auto px-4 py-12">
		<nav class="mb-6 text-sm opacity-60" aria-label="Breadcrumb">
			<a href="/" class="hover:text-amber underline">Home</a> / Radio
		</nav>

		<h1 class="mb-4 text-5xl md:text-7xl">Waterhouse Radio — live from Amsterdam</h1>

		<p class="mb-8 max-w-3xl text-xl leading-relaxed">
			Waterhouse Radio is our online radio and live-stream channel, broadcasting DJ sets and shows
			from Amsterdam's artists straight out of the Waterhouse Studios stream room. Tune in live on
			Twitch — the audience sees the show and shapes it in real time through chat.
		</p>

		<div
			class="border-secondary mb-8 overflow-hidden rounded-lg border-2 bg-black"
			style="box-shadow: 6px 6px 0 black;"
		>
			<div style="position: relative; padding-top: 56.25%;">
				<iframe
					src={embedSrc}
					title="Waterhouse Studios live stream"
					allowfullscreen
					loading="lazy"
					style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
				></iframe>
			</div>
		</div>

		<div class="mb-12 flex flex-wrap gap-4">
			<a href={LINKS.twitch} target="_blank" rel="noopener" class="midi bg-amber inline-block px-8 py-3 text-2xl text-black" style="box-shadow: 4px 4px 0 black;">Follow on Twitch</a>
			<a href={LINKS.youtube} target="_blank" rel="noopener" class="midi bg-primary inline-block px-8 py-3 text-2xl" style="box-shadow: 4px 4px 0 black;">Watch on YouTube</a>
		</div>

		<section>
			<h2 class="mb-4 text-4xl">The stream room</h2>
			<p class="max-w-3xl text-lg leading-relaxed">
				The stream room is a full DJ rig built for broadcasting — 2× CDJs and a mixer, festival
				speakers, studio monitors, a broadcast mic, HD cameras and audio-reactive lighting with a
				live chat projector. Every studio and atelier tenant gets access to the stream room as part
				of their membership, so residents can broadcast to a global audience whenever they want.
			</p>
			<p class="mt-4 text-lg">
				Want to stream your own show? <a href="/residency" class="hover:text-amber underline">Join the residency</a>
				or <a href="/studios" class="hover:text-amber underline">rent a studio</a>.
			</p>
		</section>
	</div>
</main>

<SiteFooter />
