<script lang="ts">
	// "Upcoming radio" lineup panel. States: loading renders nothing, error
	// hides the section, empty shows a one-line fallback. Times are always
	// Europe/Amsterdam (see lineup.svelte.ts).
	import IconTwitch from '$lib/icon/IconTwitch.svelte';
	import { LINKS } from '$lib/site';
	import { formatShowDay, formatShowRange, useRadioLineup } from './lineup.svelte';

	let { limit = 6 }: { limit?: number } = $props();

	const lineup = useRadioLineup();
	const shows = $derived(lineup.shows.slice(0, limit));
</script>

{#if lineup.status === 'ready'}
	<section
		class="radio-lineup font-jersey container mx-auto mt-8 px-3 md:px-0"
		aria-labelledby="radio-lineup-title"
	>
		<div class="panel relative overflow-hidden rounded-lg px-4 py-3 md:px-6 md:py-4">
			<div class="scanlines pointer-events-none absolute inset-0" aria-hidden="true"></div>
			<div class="hud relative">
				<div class="flex items-center justify-between gap-3 tracking-[0.18em]">
					<h2 id="radio-lineup-title" class="text-lg uppercase md:text-xl">Upcoming radio</h2>
					<a
						href={LINKS.twitch}
						target="_blank"
						rel="noopener"
						class="flex shrink-0 items-center gap-1.5 text-sm uppercase hover:text-white md:text-base"
					>
						<IconTwitch w={16} aria-hidden="true" />
						<span>Watch on Twitch</span>
					</a>
				</div>

				{#if shows.length === 0}
					<p class="mt-2 text-base opacity-80">
						No shows scheduled, <a
							href={LINKS.twitch}
							target="_blank"
							rel="noopener"
							class="underline hover:text-white">follow us on Twitch</a
						>.
					</p>
				{:else}
					<ol class="mt-2">
						{#each shows as show (show.id)}
							{@const isLive = lineup.liveShow?.id === show.id}
							<li class="row grid items-baseline gap-x-4 py-1.5" class:live={isLive}>
								<span class="when text-base tracking-wider whitespace-nowrap md:text-lg">
									{#if isLive}
										<span class="live-tag"
											><span class="dot" aria-hidden="true"></span>Live now</span
										>
									{:else}
										{formatShowDay(show.start)}
									{/if}
									<span class="opacity-70">{formatShowRange(show)}</span>
								</span>
								<span class="what min-w-0">
									<span class="block truncate text-lg leading-tight md:text-xl">{show.title}</span>
									{#if show.artists.length}
										<span class="block truncate text-base leading-tight opacity-60">
											{show.artists.map((a) => a.stage_name).join(' · ')}
										</span>
									{/if}
								</span>
							</li>
						{/each}
					</ol>
				{/if}
			</div>
		</div>
	</section>
{/if}

<style>
	.panel {
		background: radial-gradient(ellipse at center, #11161d 0%, #060809 100%);
		border: 1.5px solid #000;
		box-shadow:
			inset 0 0 0 1px rgba(255, 154, 60, 0.05),
			inset 0 0 24px rgba(255, 140, 26, 0.18),
			inset 0 0 80px rgba(0, 0, 0, 0.8);
	}
	.scanlines {
		background-image: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.32) 0px,
			rgba(0, 0, 0, 0.32) 1px,
			transparent 1px,
			transparent 3px
		);
		opacity: 0.6;
	}
	.hud {
		color: #ffa340;
		text-shadow:
			0 0 4px rgba(255, 140, 26, 0.7),
			0 0 8px rgba(255, 140, 26, 0.3);
	}
	.row {
		grid-template-columns: 1fr;
		border-top: 1px solid rgba(255, 140, 26, 0.15);
	}
	@media (min-width: 768px) {
		.row {
			grid-template-columns: 15rem minmax(0, 1fr);
		}
	}
	.when {
		display: flex;
		gap: 0.6em;
	}
	.live-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		text-transform: uppercase;
		color: var(--color-led-rec);
		text-shadow: 0 0 6px rgba(255, 56, 56, 0.6);
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-led-rec);
		box-shadow: 0 0 6px var(--color-led-rec);
		animation: blink 1.334s ease-in-out infinite;
	}
	@keyframes blink {
		0%,
		45%,
		100% {
			opacity: 1;
		}
		50%,
		95% {
			opacity: 0.25;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
		}
	}
</style>
