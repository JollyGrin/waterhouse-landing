<script lang="ts">
	// Radio-schedule face of the hero LCD (mockup "A · Up Next / On-air state").
	// Rendered by the home page's screen() snippet in place of the sampler video,
	// between the page's own scanline and glow overlays. Same 200px height as the
	// video, so swapping faces never shifts the layout. Times are Amsterdam.
	import { formatShowDay, formatShowTime, type RadioShow } from './lineup.svelte';
	import { formatCountdown, formatPreshow, PRESHOW_MS, type LcdState } from './lcd.svelte';

	let { state, now }: { state: Exclude<LcdState, { kind: 'fallback' }>; now: number } = $props();

	const BARS = Array.from({ length: 32 }, (_, i) => i);
	const STEPS = Array.from({ length: 8 }, (_, i) => i);
	const artists = (show: RadioShow) => show.artists.map((a) => a.stage_name).join(' · ');
	const day = (ms: number) => formatShowDay(ms).toUpperCase();
	/** 0 an hour out → 1 at start; scales the PRE-SHOW warm-up bars. */
	const warm = $derived(state.kind === 'preshow' ? 1 - state.ms / PRESHOW_MS : 0);
</script>

<div class="radio-lcd relative z-0 h-50 w-full" class:onair={state.kind === 'onair'}>
	{#if state.kind === 'onair'}
		<div class="wash pointer-events-none absolute inset-0" aria-hidden="true"></div>
	{/if}
	<div class="face absolute inset-0 flex flex-col p-2 md:p-3">
		<div
			class="hud-row flex items-center justify-between text-[0.6rem] tracking-[0.18em] md:text-xs"
		>
			<span class="flex items-center gap-1.5" class:rec={state.kind === 'onair'}>
				<span class="dot" class:blink={state.kind === 'onair'} aria-hidden="true"></span>
				<span>{state.kind === 'onair' ? 'ON AIR' : 'OFF AIR'}</span>
			</span>
			<span class="wide-only">WH—08 · RADIO</span>
			<span class="narrow-only">WH—08</span>
			<span>{formatShowTime(now)} AMS</span>
		</div>

		{#if state.kind === 'onair'}
			<div class="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
				<p class="rec live-now">LIVE NOW</p>
				<p class="onair-title max-w-full truncate">{state.show.title.toUpperCase()}</p>
				{#if state.show.artists.length}
					<p class="onair-artists max-w-full truncate">{artists(state.show).toUpperCase()}</p>
				{/if}
			</div>
		{:else if state.kind === 'preshow'}
			<div class="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
				<p class="label">NEXT ON AIR</p>
				<p class="t-minus pulse tabular-nums">{formatPreshow(state.ms)}</p>
				<p class="pre-show-line max-w-full truncate">
					{state.show.title.toUpperCase()}{#if state.show.artists.length}&ensp;·&ensp;{artists(
							state.show
						).toUpperCase()}{/if}
				</p>
			</div>
			<div class="bars flex items-end gap-[3px]" style:--warm={warm} aria-hidden="true">
				{#each BARS as i (i)}
					<span class="bar" style:animation-delay="{-((i * 0.7 * 180) % 1131)}ms"></span>
				{/each}
			</div>
		{:else}
			<div class="offair min-h-0 flex-1">
				<div class="next min-w-0">
					<p class="label soft">NEXT ON AIR</p>
					<p class="next-title truncate">{state.show.title.toUpperCase()}</p>
					<p class="next-artists truncate">{(artists(state.show) || 'TBA').toUpperCase()}</p>
				</div>
				<div class="when">
					<p class="countdown tabular-nums">{formatCountdown(state.ms)}</p>
					<p class="soft when-date">{day(state.show.start)} · {formatShowTime(state.show.start)}</p>
				</div>
				{#if state.following.length}
					<ol class="following">
						{#each state.following as show (show.id)}
							<li>
								<span class="soft">{day(show.start)}</span>
								<span class="truncate">{show.title.toUpperCase()}</span>
								<span class="soft">{formatShowTime(show.start)}</span>
							</li>
						{/each}
					</ol>
				{/if}
			</div>
			<div class="steps flex gap-1.5" aria-hidden="true">
				{#each STEPS as i (i)}
					<span class="step" style:animation-delay="{i * 0.333}s"></span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.radio-lcd {
		--lcd-amber: #ffa340;
		--lcd-soft: #c07a30;
		--lcd-dim: #4a2e10;
		--lcd-rec: var(--led-rec, #ff3838);
		container-type: inline-size;
		color: var(--lcd-amber);
		font-family: var(--font-jersey);
		line-height: 1;
		text-shadow:
			0 0 4px rgba(255, 140, 26, 0.7),
			0 0 8px rgba(255, 140, 26, 0.3);
	}
	p {
		margin: 0;
	}
	.soft {
		color: var(--lcd-soft);
	}
	.rec {
		color: var(--lcd-rec);
		text-shadow:
			0 0 4px rgba(255, 56, 56, 0.7),
			0 0 8px rgba(255, 56, 56, 0.3);
	}
	.label {
		font-size: 0.8rem;
		letter-spacing: 0.18em;
	}

	/* HUD row */
	.dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: currentColor;
		box-shadow: 0 0 6px currentColor;
	}
	.blink {
		animation: lcd-blink 1.334s ease-in-out infinite;
	}
	@keyframes lcd-blink {
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
	.narrow-only {
		display: none;
	}

	/* ON AIR */
	.wash {
		background: rgba(255, 59, 59, 0.06);
		animation: lcd-wash 1.9s ease-in-out infinite;
	}
	@keyframes lcd-wash {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}
	.live-now {
		font-size: 2.6rem;
		letter-spacing: 0.04em;
	}
	.onair-title {
		margin-top: 0.4rem;
		font-size: 1.5rem;
	}
	.onair-artists {
		margin-top: 0.25rem;
		font-size: 0.95rem;
		letter-spacing: 0.06em;
	}

	/* PRE-SHOW */
	.t-minus {
		font-size: 4rem;
		margin: 0.2rem 0 0.35rem;
	}
	.pulse {
		animation: lcd-pulse 1.38s ease-in-out infinite;
	}
	@keyframes lcd-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.75;
		}
	}
	.pre-show-line {
		font-size: 1rem;
		letter-spacing: 0.06em;
	}
	.bars {
		height: 16px;
		opacity: 0.6;
	}
	.bar {
		flex: 1;
		height: calc(4px + 12px * var(--warm, 0));
		background: var(--lcd-amber);
		box-shadow: 0 0 4px rgba(255, 140, 26, 0.5);
		transform-origin: bottom;
		animation: lcd-bar 1.131s ease-in-out infinite;
	}
	@keyframes lcd-bar {
		0%,
		100% {
			transform: scaleY(0.35);
		}
		50% {
			transform: scaleY(1);
		}
	}

	/* OFF AIR */
	.offair {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-areas:
			'next when'
			'following following';
		align-content: center;
		column-gap: 1rem;
	}
	.next {
		grid-area: next;
	}
	.next .label {
		margin-bottom: 0.3rem;
	}
	.next-title {
		font-size: 1.85rem;
	}
	.next-artists {
		margin-top: 0.2rem;
		font-size: 1rem;
		letter-spacing: 0.06em;
	}
	.when {
		grid-area: when;
		align-self: end;
		text-align: right;
	}
	.countdown {
		font-size: 2.2rem;
	}
	.when-date {
		margin-top: 0.15rem;
		font-size: 0.8rem;
		letter-spacing: 0.12em;
	}
	.following {
		grid-area: following;
		margin: 0.6rem 0 0;
		padding: 0.45rem 0 0;
		list-style: none;
		border-top: 1px solid var(--lcd-dim);
	}
	.following li {
		display: grid;
		grid-template-columns: 6.5rem minmax(0, 1fr) auto;
		gap: 0.75rem;
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		line-height: 1.35;
	}
	.steps {
		height: 4px;
	}
	.step {
		flex: 1;
		background: var(--lcd-dim);
		border-radius: 1px;
		animation: lcd-step 2.667s linear infinite;
	}
	@keyframes lcd-step {
		0%,
		11% {
			background: var(--lcd-amber);
			box-shadow: 0 0 6px rgba(255, 140, 26, 0.75);
		}
		12%,
		100% {
			background: var(--lcd-dim);
			box-shadow: none;
		}
	}

	/* Narrow LCD (phones): drop the following-shows rows, stack the countdown
	   under the title and scale the type down. */
	@container (max-width: 459px) {
		.wide-only {
			display: none;
		}
		.narrow-only {
			display: inline;
		}
		.live-now {
			font-size: 2.1rem;
		}
		.onair-title {
			font-size: 1.25rem;
		}
		.t-minus {
			font-size: 3.25rem;
		}
		.pre-show-line {
			font-size: 0.85rem;
		}
		.offair {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'next'
				'when';
		}
		.next-title {
			font-size: 1.45rem;
		}
		.next-artists {
			font-size: 0.85rem;
		}
		.when {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 0.75rem;
			margin-top: 0.5rem;
			text-align: left;
		}
		.countdown {
			font-size: 1.6rem;
		}
		.following {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.blink,
		.wash,
		.pulse,
		.bar,
		.step {
			animation: none;
		}
		.wash {
			opacity: 0.6;
		}
		.bar {
			transform: scaleY(0.6);
		}
	}
</style>
