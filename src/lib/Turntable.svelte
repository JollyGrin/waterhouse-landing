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
				// Create an SVG mask that represents the record grooves with a clean center
				const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 500">
            <defs>
              <mask id="grooveMask">
                <!-- Create the grooves only in the outer area, not in the center where the label is -->
                ${Array.from({ length: 50 })
									.map((_, i) => {
										const radius = 250 - i * 4;
										// Don't draw any grooves in the center 40% (label area)
										if (radius <= 250 * 0.4) return '';
										return `<circle cx="250" cy="250" r="${radius}" fill="${i % 2 === 0 ? 'black' : 'white'}" />`;
									})
									.join('')}
              </mask>
            </defs>
            <!-- Base black record --> 
            <circle cx="250" cy="250" r="250" fill="black" />
            <!-- Apply groove mask pattern to the black record -->
            <circle cx="250" cy="250" r="250" fill="black" mask="url(#grooveMask)" />
            <!-- White center for label (this ensures no grooves in center) -->
            <circle cx="250" cy="250" r="${250 * 0.4}" fill="white" />
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
				<div class="big-w font-jersey">W</div>
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
		background: white;
		border-radius: 50%;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
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

	.big-w {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5rem;
		font-weight: bold;
		text-transform: uppercase;
		user-select: none;
		color: var(--color-secondary);
		animation: text-spin 8s linear infinite reverse;
	}
	
	@keyframes text-spin {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
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
