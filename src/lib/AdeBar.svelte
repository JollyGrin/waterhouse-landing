<script lang="ts">
	// ADE26 takeover bar. Always in the prerendered HTML but only displayed while
	// the app.html gate sets <html data-ade>. The programme lives on ADE's venue
	// page (single source of truth) — never list events, artists or times here.
	const ADE_VENUE = 'https://www.amsterdam-dance-event.nl/en/venues/waterhouse-studios/2816561/';
</script>

<div
	class="ade-bar font-jersey relative z-40 flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-black px-4 py-2 text-lg tracking-wide text-[#ffff07] uppercase"
>
	<!-- Official ADE mark (from amsterdam-dance-event.nl), yellow/black colourway. -->
	<svg
		class="shrink-0"
		viewBox="0 0 74.9 74.9"
		width="32"
		height="32"
		role="img"
		aria-label="ADE"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polygon fill="#ffff07" points="74.9,47.4 57.2,74.9 0,74.9 0,0 74.9,0 " />
		<g>
			<path
				fill="#000"
				d="M54.5,32.8c0-1.9-2.1-2.4-4-2.4c-2,0-4.1,0.8-4.3,3.1v3.1c0.7-0.2,1.4-0.4,2.2-0.6
		C51.2,35.3,54.5,35,54.5,32.8 M37.2,47.2c-5.8,0-8.9-4.2-9-9.5c-0.7,0.2-1.4,0.4-2.1,0.6C23,39,20,39.4,20,41.7s2.6,2.8,4.5,2.8
		c1.6,0,3.2-0.4,4.1-1.3c0.3,0.7,0.8,1.3,1.2,1.8c0.2,0.2,0.4,0.4,0.6,0.6c-1.4,1.1-3.5,1.6-5.7,1.6c-3.8,0-7.9-1.4-7.9-5.9
		c0-3.6,3-4.6,6.1-5.3c2.9-0.7,6.1-1,6.1-3.3c0-1.9-2.1-2.4-4-2.4c-2,0-4.1,0.8-4.3,3.1h-3.1c0.3-4.5,3.5-5.8,7.6-5.8
		c2.2,0,4.5,0.7,5.8,2.2c1.5-1.4,3.5-2.2,6.1-2.2c1.9,0,3.5,0.5,4.8,1.2v4.4c-1-1.9-2.8-2.9-4.8-2.9c-3.2,0-5.8,2.5-5.8,7.1
		c0,4.5,2.6,7,5.8,7c3.2,0,5.8-2.5,5.8-7V21.2h3.2v7.3c1.3-0.6,2.8-0.8,4.6-0.8c3.2,0,6.9,1.5,6.9,5.3c0,3.6-3.1,4.6-6.1,5.3
		c-2.8,0.6-5.5,1-5.9,2.9l0,0C44.5,44.7,41.7,47.2,37.2,47.2 M50.2,47.2c-2.2,0-4.5-0.5-6-1.7c0.2-0.2,0.3-0.3,0.4-0.4
		c0.5-0.6,0.9-1.3,1.3-2c0.8,1.2,2.7,1.4,4.1,1.4c2.5,0,4.9-0.9,5-3.6h3.1C57.9,45.5,54.4,47.2,50.2,47.2"
			/>
		</g>
	</svg>
	<span>Official ADE26 venue</span>
	<span class="hidden opacity-50 sm:inline" aria-hidden="true">·</span>
	<span>21 ––– 25/10</span>
	<span class="hidden opacity-50 sm:inline" aria-hidden="true">·</span>
	<span>Danzigerkade 1</span>
	<a
		href={ADE_VENUE}
		target="_blank"
		rel="noopener"
		class="rounded-sm border-2 border-current px-2.5 leading-snug whitespace-nowrap transition-colors hover:bg-[#ffff07] hover:text-black"
		>Programme on ADE →</a
	>
</div>

<style>
	.ade-bar {
		display: none;
	}
	:global(html[data-ade]) .ade-bar {
		display: flex;
	}
</style>
