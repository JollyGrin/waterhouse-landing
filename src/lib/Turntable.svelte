<script lang="ts">
	import { onMount } from 'svelte';

	let {
		videoSrc = '',
		autoplay = true,
		muted = true,
		loop = true,
		width = '100%',
		height = '100%'
	} = $props();

	let videoElement: HTMLVideoElement;
	let recordRef: HTMLDivElement;
	let groovesMaskUrl = $state('');

	// Create a data URL from the grooves mask
	onMount(() => {
		if (recordRef) {
			// Wait a bit for the styles to be applied
			setTimeout(() => {
				// Create an SVG mask that represents the record grooves
				const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 500">
            <defs>
              <radialGradient id="grooves" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="black" />
                <stop offset="40%" stop-color="black" />
                <stop offset="40.5%" stop-color="white" />
                <stop offset="100%" stop-color="white" />
              </radialGradient>
              <mask id="grooveMask">
                ${Array.from({ length: 50 })
									.map((_, i) => {
										const radius = 250 - i * 4;
										return `<circle cx="250" cy="250" r="${radius}" fill="${i % 2 === 0 ? 'black' : 'white'}" />`;
									})
									.join('')}
              </mask>
            </defs>
            <rect x="0" y="0" width="500" height="500" fill="url(#grooves)" mask="url(#grooveMask)" />
          </svg>`;

				const encodedSvg = encodeURIComponent(svg);
				groovesMaskUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
			}, 100);
		}
	});
</script>

<div class="turntable-container flex items-center justify-center p-4" style:width style:height>
	<div class="turntable">
		<div class="record" bind:this={recordRef}>
			<!-- Video container with mask applied -->
			<div
				class="video-container"
				style={groovesMaskUrl
					? `-webkit-mask-image: url('${groovesMaskUrl}'); mask-image: url('${groovesMaskUrl}')`
					: ''}
			>
				<video bind:this={videoElement} src={videoSrc} {autoplay} {muted} {loop} playsinline
				></video>
			</div>
			<!-- Visual representation of grooves -->
			<div class="grooves"></div>
			<div class="label">
				<div class="center-dot"></div>
				<div class="record-text font-jersey">
					{#each Array(12) as _, i}
						<span style="transform: rotate({i * 30}deg) translateY(-310%)">WATERHOUSE</span>
					{/each}
				</div>
			</div>
		</div>
		<div class="tonearm"></div>
	</div>
</div>

<style>
	.turntable-container {
		aspect-ratio: 1;
	}

	.turntable {
		position: relative;
		width: 80%;
		height: 82%;
		background: transparent;
		border-radius: 10px;
		padding: 2rem;
	}

	.record {
		position: relative;
		width: 100%;
		height: 100%;
		background: #111;
		border-radius: 50%;
		animation: spin 20s linear infinite;
		overflow: hidden;
	}

	.video-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border-radius: 50%;
		z-index: 1;
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.grooves {
		position: absolute;
		inset: 0;
		background: repeating-radial-gradient(
			circle at center,
			var(--color-highlight) 0,
			var(--color-highlight) 2px,
			var(--color-secondary) 3px,
			white 4px
		);
		z-index: 2;
		pointer-events: none;
		opacity: 0.8;
		mix-blend-mode: normal;
	}

	.label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		background: var(--color-primary);
		border-radius: 50%;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center-dot {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 12px;
		height: 12px;
		background: #000;
		border-radius: 50%;
		z-index: 2;
	}

	.record-text {
		position: absolute;
		width: 100%;
		height: 100%;
		animation: text-spin 20s linear infinite reverse;
	}

	.record-text span {
		position: absolute;
		left: 50%;
		top: 50%;
		transform-origin: 0 0;
		font-size: 0.8rem;
		font-weight: bold;
		text-transform: uppercase;
		user-select: none;
		color: var(--color-secondary);
		white-space: nowrap;
		letter-spacing: 0.1em;
	}

	@keyframes text-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.tonearm {
		position: absolute;
		top: 10%;
		right: 10%;
		width: 40%;
		height: 4px;
		background: var(--color-highlight);
		transform-origin: right center;
		transform: rotate(-20deg);
		z-index: 2;
	}

	.tonearm::after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 8px;
		height: 8px;
		background: var(--color-highlight);
		border-radius: 50%;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
