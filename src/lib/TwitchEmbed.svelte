<script lang="ts">
	// Live Twitch player that stands in for the hero sampler screen while the
	// waterhousestudios stream is on air. Mirrors the embed pattern used on the
	// /radio page: autoplay requires `muted=true`, and Twitch needs every host
	// domain declared as a `parent` (localhost included for local preview).
	const parents = ['waterhousestudios.nl', 'localhost'];
	const embedSrc =
		`https://player.twitch.tv/?channel=waterhousestudios&muted=true&` +
		parents.map((p) => `parent=${p}`).join('&');

	let { title = undefined, viewers = undefined }: { title?: string; viewers?: number } = $props();
</script>

<div class="lcd relative w-full overflow-hidden rounded">
	<div class="embed-frame">
		<iframe
			src={embedSrc}
			title="Waterhouse Studios live stream"
			allowfullscreen
			allow="autoplay; fullscreen"
			style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
		></iframe>
	</div>
	<div
		class="lcd-hud pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-2 text-[0.6rem] tracking-[0.18em] md:p-3 md:text-xs"
	>
		<span class="flex items-center gap-1.5">
			<span class="led-live"></span>
			<span>LIVE</span>
		</span>
		{#if title}
			<span class="lcd-title truncate">{title}</span>
		{/if}
		{#if viewers != null}
			<span>{viewers} 👁</span>
		{/if}
	</div>
</div>

<style>
	/* Match the sampler LCD housing so the swap is seamless. */
	.lcd {
		background: radial-gradient(ellipse at center, #11161d 0%, #060809 100%);
		border: 1.5px solid #000;
		box-shadow:
			inset 0 0 0 1px rgba(255, 154, 60, 0.05),
			0 0 0 2px rgba(0, 0, 0, 0.1);
	}
	/* 16:9 responsive box — fills the .screen cell like the sampler video does. */
	.embed-frame {
		position: relative;
		width: 100%;
		padding-top: 56.25%;
	}
	.lcd-hud {
		color: #ffa340;
		font-family: var(--font-jersey);
		text-shadow:
			0 0 4px rgba(255, 140, 26, 0.7),
			0 0 8px rgba(255, 140, 26, 0.3);
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 100%);
	}
	.lcd-title {
		max-width: 55%;
	}
	.led-live {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ff3b30;
		box-shadow:
			0 0 6px rgba(255, 59, 48, 0.9),
			0 0 12px rgba(255, 59, 48, 0.5);
		animation: live-pulse 1.4s ease-in-out infinite;
	}
	@keyframes live-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}
</style>
