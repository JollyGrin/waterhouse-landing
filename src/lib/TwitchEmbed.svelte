<script lang="ts">
	import { onMount } from 'svelte';

	// Live Twitch player that stands in for the hero sampler screen while the
	// stream is on air. `parent` is the host domain (not the channel), so it
	// stays fixed while `channel` follows the status payload.
	//
	// The player starts muted+autoplay (Chrome plays muted video without a
	// gesture; on mobile it may stay paused). We use the Twitch Player JS SDK so a
	// single tap on our own full-area overlay can start + unmute the *existing*
	// stream in place (play + setMuted, no reload/reconnect) — the user never has
	// to hunt for Twitch's own buried play/unmute controls.
	//
	// FAIL-SAFE: if the SDK script fails to load or `Twitch.Player` is
	// unavailable, we fall back to a plain muted+autoplay iframe (the original
	// embed), so the feature can never break the hero.
	let {
		channel = undefined,
		title = undefined,
		viewers = undefined
	}: { channel?: string; title?: string; viewers?: number } = $props();

	const parents = ['waterhousestudios.nl', 'localhost'];
	const resolvedChannel = $derived(channel || 'waterhousestudios');

	// Plain muted, autoplaying iframe used as the fail-safe fallback.
	const embedSrc = $derived(
		`https://player.twitch.tv/?channel=${resolvedChannel}&muted=true&autoplay=true&` +
			parents.map((p) => `parent=${p}`).join('&')
	);

	// 'loading' — SDK in flight, target div mounted so the player has a home.
	// 'sdk'     — SDK player created; the tap-to-watch overlay is available.
	// 'fallback'— SDK unavailable; render the plain muted iframe instead.
	let status = $state<'loading' | 'sdk' | 'fallback'>('loading');
	// Full-area overlay is shown until the first tap. On mobile muted autoplay
	// may not start, leaving the player paused behind Twitch's own chrome; the
	// overlay is our single clean tap target that starts + unmutes in one gesture.
	let interacted = $state(false);
	let playerEl = $state<HTMLDivElement>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let player: any = null;

	const SDK_SRC = 'https://player.twitch.tv/js/embed/v1.js';

	function loadTwitchSdk(): Promise<void> {
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const T = (window as any).Twitch;
			if (T && T.Player) {
				resolve();
				return;
			}
			const existing = document.querySelector<HTMLScriptElement>('script[data-twitch-embed]');
			if (existing) {
				existing.addEventListener('load', () => resolve());
				existing.addEventListener('error', () => reject(new Error('twitch sdk failed')));
				return;
			}
			const s = document.createElement('script');
			s.src = SDK_SRC;
			s.async = true;
			s.dataset.twitchEmbed = 'true';
			s.addEventListener('load', () => resolve());
			s.addEventListener('error', () => reject(new Error('twitch sdk failed')));
			document.head.appendChild(s);
		});
	}

	onMount(() => {
		let cancelled = false;
		loadTwitchSdk()
			.then(() => {
				if (cancelled) return;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const T = (window as any).Twitch;
				if (!T || !T.Player || !playerEl) {
					status = 'fallback';
					return;
				}
				player = new T.Player(playerEl, {
					channel: resolvedChannel,
					parent: parents,
					muted: true,
					autoplay: true,
					width: '100%',
					height: '100%'
				});
				status = 'sdk';
			})
			.catch(() => {
				if (!cancelled) status = 'fallback';
			});
		return () => {
			cancelled = true;
		};
	});

	function activate() {
		if (!player) return;
		// One user gesture starts everything in place (no reload): play() covers
		// mobile where muted autoplay never started (harmless no-op on desktop
		// where it's already playing); setMuted(false)+setVolume add sound.
		player.play();
		player.setMuted(false);
		player.setVolume(0.5);
		interacted = true;
	}
</script>

<div class="lcd relative w-full overflow-hidden rounded">
	<div class="embed-frame">
		{#if status === 'fallback'}
			<iframe
				src={embedSrc}
				title="Waterhouse Studios live stream"
				allowfullscreen
				allow="autoplay; fullscreen"
				style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
			></iframe>
		{:else}
			<div bind:this={playerEl} class="player-target"></div>
		{/if}

		{#if status === 'sdk' && !interacted}
			<button
				class="tap-overlay"
				onclick={activate}
				aria-label="Tap to watch the live stream with sound"
			>
				<span class="tap-inner">
					<span class="tap-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="30" height="30">
							<path fill="currentColor" d="M8 5v14l11-7z" />
						</svg>
					</span>
					<span class="tap-label">tap to watch with sound</span>
				</span>
			</button>
		{/if}
	</div>
	<div
		class="lcd-hud pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between p-2 text-[0.6rem] tracking-[0.18em] md:p-3 md:text-xs"
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
	/* SDK mounts its <iframe> inside here; make it fill the 16:9 box. */
	.player-target {
		position: absolute;
		inset: 0;
	}
	.player-target :global(iframe) {
		width: 100%;
		height: 100%;
		border: 0;
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
	/* Full-area tap target over the whole video — one clean control of ours that
	   sits above Twitch's cluttered chrome and starts + unmutes in a single tap.
	   Sampler/LCD aesthetic: darkened video, amber glowing play prompt. */
	.tap-overlay {
		position: absolute;
		inset: 0;
		z-index: 30;
		pointer-events: auto;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: 0;
		cursor: pointer;
		/* Fairly opaque so Twitch's own chrome (Follow/Subscribe/play) is masked and
		   our prompt reads as the single thing to tap. */
		background: radial-gradient(
			ellipse at center,
			rgba(6, 8, 9, 0.82) 0%,
			rgba(6, 8, 9, 0.95) 100%
		);
		color: #ffa340;
		font-family: var(--font-jersey);
		text-shadow:
			0 0 6px rgba(255, 140, 26, 0.6),
			0 0 12px rgba(255, 140, 26, 0.3);
		transition: background 0.15s ease;
	}
	.tap-overlay:hover {
		background: radial-gradient(ellipse at center, rgba(6, 8, 9, 0.72) 0%, rgba(6, 8, 9, 0.9) 100%);
	}
	.tap-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 0 16px;
		text-align: center;
	}
	.tap-icon {
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		padding-left: 4px; /* optically center the play triangle */
		border: 2px solid rgba(255, 163, 64, 0.85);
		border-radius: 50%;
		background: rgba(6, 8, 9, 0.55);
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.4),
			0 0 22px rgba(255, 140, 26, 0.4),
			inset 0 0 16px rgba(255, 140, 26, 0.2);
	}
	.tap-overlay:active .tap-icon {
		transform: translateY(1px);
	}
	.tap-label {
		font-size: 0.95rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
</style>
