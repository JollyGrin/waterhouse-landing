<script lang="ts">
	import { onMount } from 'svelte';

	// Live Twitch player that stands in for the hero sampler screen while the
	// stream is on air. `parent` is the host domain (not the channel), so it
	// stays fixed while `channel` follows the status payload.
	//
	// Chrome blocks *unmuted* autoplay, so the player starts muted+autoplay. To
	// offer sound we use the Twitch Player JS SDK: `player.setMuted(false)` called
	// inside a user click gesture is allowed, and — unlike swapping the iframe
	// `src` — it unmutes the *existing* stream without reloading/reconnecting.
	//
	// FAIL-SAFE: if the SDK script fails to load or `Twitch.Player` is
	// unavailable, we fall back to a plain muted iframe (the original embed), so
	// the feature can never break the hero.
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
	// 'sdk'     — SDK player created; the unmute overlay is available.
	// 'fallback'— SDK unavailable; render the plain muted iframe instead.
	let status = $state<'loading' | 'sdk' | 'fallback'>('loading');
	let muted = $state(true);
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

	function unmute() {
		if (!player) return;
		// The video is already playing (muted autoplay), so this click only needs
		// to add sound — unmute the existing stream in place, no reload, no play().
		player.setMuted(false);
		player.setVolume(0.5);
		muted = false;
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

		{#if status === 'sdk' && muted}
			<button class="unmute-btn" onclick={unmute} aria-label="Tap to unmute the live stream">
				<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
					<path
						fill="currentColor"
						d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06A9 9 0 0 0 14 3.23z"
					/>
				</svg>
				<span>tap to unmute</span>
			</button>
		{/if}
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
	/* Unmute affordance in the sampler/LCD aesthetic — amber, glowing, monospace. */
	.unmute-btn {
		position: absolute;
		left: 50%;
		bottom: 12px;
		transform: translateX(-50%);
		z-index: 30;
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		border: 1.5px solid rgba(255, 163, 64, 0.7);
		border-radius: 999px;
		background: rgba(6, 8, 9, 0.82);
		color: #ffa340;
		font-family: var(--font-jersey);
		font-size: 0.8rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		cursor: pointer;
		text-shadow: 0 0 6px rgba(255, 140, 26, 0.5);
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.4),
			0 0 16px rgba(255, 140, 26, 0.35);
		transition:
			background 0.15s ease,
			box-shadow 0.15s ease,
			transform 0.05s ease;
	}
	.unmute-btn:hover {
		background: rgba(16, 22, 29, 0.92);
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.4),
			0 0 22px rgba(255, 140, 26, 0.55);
	}
	.unmute-btn:active {
		transform: translateX(-50%) translateY(1px);
	}
</style>
