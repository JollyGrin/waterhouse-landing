<script lang="ts">
	// "Follow on Twitch" key for the hero LCD's non-live faces (#31): RadioLcd's
	// OFF AIR / PRE-SHOW / scheduled ON AIR and the page's sampler fallback.
	// Drawn in the LCD's amber pixel type so it reads as part of the display; it
	// inverts on hover/focus. Fixed small height so it can share the bottom row
	// with the step dots / warm-up bars without growing the 200px face. Sits
	// under the page's scanline + glow overlays, which are pointer-events-none.
	import IconTwitch from '$lib/icon/IconTwitch.svelte';
	import { LINKS } from '$lib/site';

	/** "watch" on the scheduled ON AIR face, where the show is (about to be) streaming. */
	let { verb = 'follow' }: { verb?: 'follow' | 'watch' } = $props();
	const word = $derived(verb === 'watch' ? 'Watch' : 'Follow');
</script>

<a
	href={LINKS.twitch}
	target="_blank"
	rel="noopener noreferrer"
	class="lcd-twitch"
	aria-label="{word} Waterhouse on Twitch (opens in a new tab)"
>
	<IconTwitch w={12} aria-hidden="true" />
	<span aria-hidden="true">▶ {word.toUpperCase()}<span class="wide">&nbsp;ON TWITCH</span></span>
</a>

<style>
	.lcd-twitch {
		--amber: #ffa340;
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.35rem;
		height: 18px;
		padding: 0 0.45rem;
		border: 1px solid #c07a30;
		border-radius: 2px;
		color: var(--amber);
		font-family: var(--font-jersey);
		font-size: 0.8rem;
		letter-spacing: 0.14em;
		line-height: 1;
		white-space: nowrap;
		text-decoration: none;
		text-shadow:
			0 0 4px rgba(255, 140, 26, 0.7),
			0 0 8px rgba(255, 140, 26, 0.3);
		box-shadow:
			0 0 6px rgba(255, 140, 26, 0.25),
			inset 0 0 6px rgba(255, 140, 26, 0.12);
		pointer-events: auto;
		transition:
			background-color 120ms,
			color 120ms,
			box-shadow 120ms;
	}
	.lcd-twitch :global(svg) {
		flex-shrink: 0;
		filter: drop-shadow(0 0 3px rgba(255, 140, 26, 0.7));
	}
	.lcd-twitch:hover,
	.lcd-twitch:focus-visible {
		background: var(--amber);
		border-color: var(--amber);
		color: #060809;
		text-shadow: none;
		box-shadow: 0 0 12px rgba(255, 140, 26, 0.75);
	}
	.lcd-twitch:hover :global(svg),
	.lcd-twitch:focus-visible :global(svg) {
		filter: none;
	}
	.lcd-twitch:focus-visible {
		outline: 1px solid var(--amber);
		outline-offset: 2px;
	}

	/* Short label only on very narrow LCDs (≈320px phones still fit the full one);
	   the container is whichever LCD face hosts it. */
	@container (max-width: 279px) {
		.wide {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.lcd-twitch {
			transition: none;
		}
	}
</style>
