<script lang="ts">
	export const prerender = true;
	import IconEmail from '$lib/icon/IconEmail.svelte';
	import IconLocation from '$lib/icon/IconLocation.svelte';
	import ModalAbout from '$lib/modal/ModalAbout.svelte';
	import ModalMusicStudio from '$lib/modal/ModalMusicStudio.svelte';
	import ModalOffice from '$lib/modal/ModalOffice.svelte';
	import ModalOpportunities from '$lib/modal/ModalOpportunities.svelte';
	import ModalSendEmail from '$lib/modal/ModalSendEmail.svelte';
	import ModalServices from '$lib/modal/ModalServices.svelte';
	import ModalStream from '$lib/modal/ModalStream.svelte';
	import ModalVideo from '$lib/modal/ModalVideo.svelte';
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
	import SEOContent from '$lib/SEOContent.svelte';
	import GradientBanner from '$lib/GradientBanner.svelte';
	import toast from 'svelte-french-toast';
	import IconInstagram from '$lib/icon/IconInstagram.svelte';
	import IconTwitch from '$lib/icon/IconTwitch.svelte';
	import { Confetti } from 'svelte-confetti';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const siteTitle = 'Waterhouse Studios';
	const siteDescription =
		'Premium music studios and creative spaces for music creators and industry professionals';
	const siteUrl = 'https://waterhousestudios.nl';

	const galleryImages = [
		'event_1.jpg',
		'event_2.jpg',
		'event_3.jpg',
		'gallery_1.jpg',
		'gallery_2.jpg',
		'studio_1.jpg',
		'studio_back.jpg',
		'studio_front.jpg'
	];

	// SEO-specific content extracted from modals
	const seoAboutContent = `
		A Space Crafted for Music Creators and Industry Professionals

		At Waterhouse Studios, everything we offer is tailored specifically to the needs of music creators and the people working in the music industry. Our mission is to provide cutting-edge facilities and foster a collaborative environment where artists and professionals can connect, create, and succeed.

		Waterhouse Studios offers premium music studios, each custom-designed by industry professionals for optimal acoustics and workflow. Built by creators, for creators, our spaces provide the perfect environment to produce, collaborate, and grow.

		Why Waterhouse Studios?
		What sets Waterhouse Studios apart? It's the combination of world-class facilities, comprehensive artist development resources, and a vibrant community—all in one place. We're more than just a studio; we're a partner in your creative journey.

		A Vibrant Community
		At the heart of Waterhouse Studios is a thriving community of creatives who share a passion for innovation and artistic excellence. Here, you'll find a supportive network of peers and mentors who are as invested in your success as you are.
	`;

	// Combine all SEO content
	const allSeoContent = seoAboutContent;

	let isModalOpen:
		| null
		| 'about'
		| 'studios'
		| 'offices'
		| 'stream'
		| 'services'
		| 'opportunities'
		| 'stream'
		| 'join'
		| 'video' = $state(null);
	const onClose = () => (isModalOpen = null);
	const onOpenJoin = () => (isModalOpen = 'join');

	const comingSoon = () => toast.success('Coming soon!');

	const drumSounds = [
		'MM Snare 1 copy.wav',
		'MM Tom 5.wav',
		'Untitled 10-3-Audio 2.wav',
		'Untitled 3-Audio.wav',
		'Untitled 4-3-Audio 2.wav',
		'Untitled 5-3-Audio 2.wav',
		'Untitled 6-3-Audio 2.wav',
		'Untitled 7-3-Audio 2.wav',
		'Untitled 8-3-Audio 2.wav',
		'Untitled 9-3-Audio 2.wav'
	];

	const sampleSounds = [
		'MM Boss Fall 2.wav',
		'MM Boss Fire 1.wav',
		'MM Boss Fire 4.wav',
		'MM Brick Smash 1.wav',
		'MM Bridge Collapse 1.wav',
		'MM Bridge Collapse 4.wav',
		'MM Bump 3.wav',
		'MM Coin 1.wav',
		'MM Dying 1.wav',
		'MM Fireball 1.wav',
		'MM Firework 1.wav',
		'MM Flagpole 2.wav',
		'MM Item Appears 5.wav',
		'MM Jump Big 1.wav',
		'MM Jump Small 1.wav',
		'MM Pause Game 1.wav',
		'MM Power Down & Pipe 1.wav',
		'MM Power Up 1.wav',
		'MM Squish Stomp 1.wav',
		'MM Vine Grow 4.wav'
	];

	function playRandomSound(sounds: string[], directory: string) {
		const randomIndex = Math.floor(Math.random() * sounds.length);
		const soundFile = sounds[randomIndex];
		const audio = new Audio(`/${directory}/${soundFile}`);
		audio.play();
	}

	function playDrum() {
		playRandomSound(drumSounds, 'drum');
	}

	function playSample() {
		playRandomSound(sampleSounds, 'sample');
	}

	let showConfetti = $state(false);
	let confettiConfig = $state({});
	let confettiPosition = $state({ x: 0, y: 0 });
	let confettiTimeout = null;

	let selectedImage = $state(null);

	let galleryContainer: HTMLElement;

	$effect(() => {
		if (!galleryContainer) return;
		const items = galleryContainer.querySelectorAll('.masonry-item');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);
		items.forEach((item) => observer.observe(item));
		return () => observer.disconnect();
	});

	function triggerConfetti(event) {
		// Immediately stop any existing confetti
		if (confettiTimeout) {
			clearTimeout(confettiTimeout);
			confettiTimeout = null;
		}
		showConfetti = false;

		// Small delay to ensure component unmounts before remounting
		setTimeout(() => {
			// Get button position in pixels
			const rect = event.target.getBoundingClientRect();
			confettiPosition = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			};
			// Random dramatic effects
			const effects = [
				{
					amount: 200,
					duration: 4000,
					colorArray: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
					infinite: false,
					cone: true,
					noGravity: false
				},
				{
					amount: 150,
					duration: 3500,
					colorArray: ['#ffd700', '#ff6347', '#9370db', '#20b2aa', '#ff69b4'],
					infinite: false,
					cone: false,
					noGravity: true
				},
				{
					amount: 300,
					duration: 5000,
					colorArray: ['#ff4500', '#32cd32', '#1e90ff', '#ff1493', '#ffa500'],
					infinite: false,
					cone: true,
					noGravity: false
				},
				{
					amount: 250,
					duration: 4500,
					colorArray: ['#8a2be2', '#dc143c', '#00ced1', '#ffd700', '#adff2f'],
					infinite: false,
					cone: false,
					noGravity: false
				}
			];

			// Pick random effect
			const randomEffect = effects[Math.floor(Math.random() * effects.length)];
			confettiConfig = randomEffect;

			// Start new confetti
			showConfetti = true;
			confettiTimeout = setTimeout(() => {
				showConfetti = false;
				confettiTimeout = null;
			}, randomEffect.duration);
		}, 10);
	}

	function openImageModal(image) {
		selectedImage = image;
	}

	function closeImageModal() {
		selectedImage = null;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && selectedImage) {
			closeImageModal();
		}
	}
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={siteDescription} />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<ModalMusicStudio {onClose} {onOpenJoin} isOpen={isModalOpen === 'studios'} />
<ModalOffice {onClose} {onOpenJoin} isOpen={isModalOpen === 'offices'} />
<ModalServices {onClose} isOpen={isModalOpen === 'services'} />
<ModalStream {onClose} {onOpenJoin} isOpen={isModalOpen === 'stream'} />
<ModalOpportunities {onClose} isOpen={isModalOpen === 'opportunities'} />
<ModalSendEmail {onClose} isOpen={isModalOpen === 'join'} />
<ModalAbout {onClose} isOpen={isModalOpen === 'about'} />
<ModalVideo {onClose} isOpen={isModalOpen === 'video'} videoSrc="/tour.mp4" />

<!-- Hidden SEO content for search engines -->
<SEOContent content={allSeoContent} />

<!-- ============================================
     MPC CONTROLLER BODY
     ============================================ -->
<div class="ctrl-container font-jersey">
	<!-- Corner screws (bottom) -->
	<div class="corner-screw corner-bl"></div>
	<div class="corner-screw corner-br"></div>

	<!-- Brand plate -->
	<div class="brand-plate">
		<div class="screw"></div>
		<div class="brand-content">
			<img src="/logo.svg" alt="Waterhouse Studios" class="brand-logo" />
			<span class="brand-text">WATERHOUSE STUDIOS</span>
		</div>
		<div class="brand-nav">
			<button class="brand-btn" onclick={() => (isModalOpen = 'studios')}>rent a studio</button>
			<span class="brand-divider">|</span>
			<button class="brand-btn" onclick={() => (isModalOpen = 'offices')}>rent an atelier</button
			>
		</div>
		<div class="screw"></div>
	</div>

	<!-- Screen housing -->
	<div class="screen-housing">
		<div class="screen-bezel">
			<video src="/screen.mp4" autoplay muted loop playsinline></video>
		</div>
		<div class="screen-buttons">
			<button onclick={() => (isModalOpen = 'studios')}>studios</button>
			<button onclick={() => (isModalOpen = 'offices')}>ateliers</button>
		</div>
	</div>

	<!-- 4x4 Pad grid -->
	<div class="pad-grid">
		<!-- Row 1: Warm orange -->
		<div class="pad-cell pad-1">
			<button class="pad-btn" aria-label="Studios" onclick={() => (isModalOpen = 'studios')}
			></button>
			<span class="pad-label">studios</span>
		</div>
		<div class="pad-cell pad-2">
			<button class="pad-btn" aria-label="Ateliers" onclick={() => (isModalOpen = 'offices')}
			></button>
			<span class="pad-label">ateliers</span>
		</div>
		<div class="pad-cell pad-3">
			<button class="pad-btn" aria-label="Services" onclick={() => (isModalOpen = 'services')}
			></button>
			<span class="pad-label">services</span>
		</div>
		<div class="pad-cell pad-4">
			<button
				class="pad-btn"
				aria-label="Benefits"
				onclick={() => (isModalOpen = 'opportunities')}></button>
			<span class="pad-label">benefits</span>
		</div>

		<!-- Row 2: Cyan/teal -->
		<div class="pad-cell pad-5">
			<button class="pad-btn" aria-label="Stream" onclick={() => (isModalOpen = 'stream')}
			></button>
			<span class="pad-label">stream</span>
		</div>
		<div class="pad-cell pad-6">
			<button class="pad-btn" aria-label="Play Video" onclick={() => (isModalOpen = 'video')}
			></button>
			<span class="pad-label">play</span>
		</div>
		<div class="pad-cell pad-7">
			<button class="pad-btn" aria-label="About" onclick={() => (isModalOpen = 'about')}
			></button>
			<span class="pad-label">about</span>
		</div>
		<div class="pad-cell pad-8">
			<button
				class="pad-btn"
				aria-label="Location"
				onclick={() => window.open('https://maps.app.goo.gl/nkE2XhCBkjkw9suY6', '_blank')}
			></button>
			<span class="pad-label">location</span>
		</div>

		<!-- Row 3: Red, green, gold, white -->
		<div class="pad-cell pad-9">
			<button class="pad-btn" aria-label="Rec" onclick={comingSoon}></button>
			<span class="pad-label">rec</span>
		</div>
		<div class="pad-cell pad-10">
			<button class="pad-btn" aria-label="Sample" onclick={playSample}></button>
			<span class="pad-label">sample</span>
		</div>
		<div class="pad-cell pad-11">
			<button class="pad-btn" aria-label="Drum" onclick={playDrum}></button>
			<span class="pad-label">drum</span>
		</div>
		<div class="pad-cell pad-12">
			<button class="pad-btn" aria-label="Special" onclick={triggerConfetti}></button>
			<span class="pad-label">special</span>
		</div>

		<!-- Row 4: Pink, purple, violet, white -->
		<div class="pad-cell pad-13">
			<button class="pad-btn" aria-label="Contact" onclick={() => (isModalOpen = 'join')}
			></button>
			<span class="pad-label">contact</span>
		</div>
		<div class="pad-cell pad-14">
			<button
				class="pad-btn"
				aria-label="Instagram"
				onclick={() =>
					window.open('https://www.instagram.com/waterhousestudiosamsterdam', '_blank')}
			></button>
			<span class="pad-label">instagram</span>
		</div>
		<div class="pad-cell pad-15">
			<button
				class="pad-btn"
				aria-label="Twitch"
				onclick={() => window.open('https://www.twitch.tv/waterhousestudios', '_blank')}
			></button>
			<span class="pad-label">twitch</span>
		</div>
		<div class="pad-cell pad-16">
			<button class="pad-btn" aria-label="Waterhouse" onclick={triggerConfetti}></button>
			<span class="pad-label">W</span>
		</div>
	</div>

	<!-- Controls column -->
	<div class="controls-column">
		<div class="speaker-housing">
			<SpeakerGrate />
		</div>
		<div class="volume-knob-wrap">
			<div class="knob"></div>
			<span class="knob-label">volume</span>
		</div>
		<div class="social-icons">
			<a
				href="https://www.instagram.com/waterhousestudiosamsterdam"
				target="_blank"
				rel="noopener"
			>
				<IconInstagram w={20} />
			</a>
			<a href="https://www.twitch.tv/waterhousestudios" target="_blank" rel="noopener">
				<IconTwitch w={20} />
			</a>
		</div>
	</div>

	<!-- Crossfader -->
	<div class="crossfader">
		<span class="crossfader-label">crossfader</span>
		<input type="range" min="0" max="100" value="50" />
	</div>
</div>

{#if showConfetti}
	<div
		style="position: fixed; left: {confettiPosition.x}px; top: {confettiPosition.y}px; pointer-events: none; z-index: 1000;"
	>
		<Confetti {...confettiConfig} />
	</div>
{/if}

<!-- Fullscreen Image Modal -->
{#if selectedImage}
	<div
		class="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-lg"
		onclick={closeImageModal}
	>
		<img
			src="/gallery/{selectedImage}"
			alt="Fullscreen gallery image"
			class="max-h-full max-w-full rounded-xl object-contain"
			onclick={(e) => e.stopPropagation()}
			transition:scale={{ duration: 400, easing: quintOut, start: 0.8 }}
		/>
	</div>
{/if}

<!-- Gallery Masonry Grid -->
<div class="font-jersey mt-8 bg-black px-3 py-4 text-slate-100" bind:this={galleryContainer}>
	<div class="masonry-grid">
		{#each galleryImages as image, i}
			<div class="masonry-item" style="--reveal-delay: {i * 80}ms">
				<img
					src="/gallery/{image}"
					alt="Waterhouse Studios gallery image {i + 1}"
					class="h-auto w-full cursor-pointer rounded-lg object-cover shadow-lg transition-transform hover:scale-105 hover:saturate-150"
					loading="lazy"
					onclick={() => openImageModal(image)}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	/* ============================================
	   CONTROLLER BODY
	   ============================================ */
	.ctrl-container {
		position: relative;
		width: 100vw;
		min-height: 100vh;
		min-height: 100dvh;
		background: linear-gradient(180deg, #222 0%, #1a1a1a 50%, #161616 100%);
		display: grid;
		grid-template-columns: 280px 1fr 140px;
		grid-template-rows: 56px 1fr 64px;
		grid-template-areas:
			'brand brand brand'
			'screen pads controls'
			'slider slider slider';
		padding: 16px;
		gap: 16px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			inset 0 -1px 0 rgba(0, 0, 0, 0.5),
			0 0 60px rgba(0, 0, 0, 0.8);
		overflow: hidden;
	}

	/* Subtle body texture */
	.ctrl-container::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-conic-gradient(
				rgba(255, 255, 255, 0.01) 0% 25%,
				transparent 0% 50%
			)
			0 0 / 4px 4px;
		pointer-events: none;
		z-index: 0;
	}

	.ctrl-container > :not(.corner-screw) {
		position: relative;
		z-index: 1;
	}

	/* ============================================
	   BRAND PLATE
	   ============================================ */
	.brand-plate {
		grid-area: brand;
		display: flex;
		align-items: center;
		gap: 12px;
		background:
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 1px,
				rgba(255, 255, 255, 0.03) 1px,
				rgba(255, 255, 255, 0.03) 2px
			),
			linear-gradient(180deg, #3a3a3a, #2a2a2a, #252525);
		border-radius: 4px;
		padding: 0 16px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 2px 4px rgba(0, 0, 0, 0.5);
		animation: boot-in 0.5s ease both;
		animation-delay: 0ms;
	}

	.brand-content {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.brand-logo {
		width: 32px;
		height: 32px;
		filter: brightness(0.5);
	}

	.brand-text {
		color: #555;
		font-size: 16px;
		letter-spacing: 4px;
		text-transform: uppercase;
		text-shadow:
			0 -1px 0 rgba(0, 0, 0, 0.8),
			0 1px 0 rgba(255, 255, 255, 0.05);
		white-space: nowrap;
	}

	.brand-nav {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-left: auto;
	}

	.brand-btn {
		background: none;
		border: none;
		box-shadow: none;
		color: #666;
		font-size: 14px;
		letter-spacing: 2px;
		text-transform: uppercase;
		cursor: pointer;
		transition: color 0.2s ease;
		padding: 0;
		width: auto;
		height: auto;
	}

	.brand-btn:hover {
		color: #999;
		transform: none;
		box-shadow: none;
	}

	.brand-divider {
		color: #444;
		font-size: 14px;
	}

	/* ============================================
	   SCREWS
	   ============================================ */
	.screw {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 40%, #555, #333, #222);
		box-shadow:
			inset 0 1px 2px rgba(255, 255, 255, 0.2),
			0 1px 2px rgba(0, 0, 0, 0.5);
		position: relative;
		flex-shrink: 0;
	}

	.screw::before,
	.screw::after {
		content: '';
		position: absolute;
		background: rgba(0, 0, 0, 0.6);
	}

	.screw::before {
		width: 8px;
		height: 1.5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.screw::after {
		width: 1.5px;
		height: 8px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.corner-screw {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 40%, #555, #333, #222);
		box-shadow:
			inset 0 1px 2px rgba(255, 255, 255, 0.2),
			0 1px 2px rgba(0, 0, 0, 0.5);
		z-index: 2;
	}

	.corner-screw::before,
	.corner-screw::after {
		content: '';
		position: absolute;
		background: rgba(0, 0, 0, 0.6);
	}

	.corner-screw::before {
		width: 8px;
		height: 1.5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.corner-screw::after {
		width: 1.5px;
		height: 8px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.corner-bl {
		bottom: 20px;
		left: 20px;
	}
	.corner-br {
		bottom: 20px;
		right: 20px;
	}

	/* ============================================
	   SCREEN HOUSING
	   ============================================ */
	.screen-housing {
		grid-area: screen;
		display: flex;
		flex-direction: column;
		gap: 12px;
		animation: boot-in 0.5s ease both;
		animation-delay: 50ms;
	}

	.screen-bezel {
		position: relative;
		background: #0a0a0a;
		border-radius: 8px;
		padding: 8px;
		box-shadow:
			inset 0 2px 8px rgba(0, 0, 0, 0.8),
			inset 0 0 20px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		flex: 1;
		animation: screen-glow 4s ease-in-out infinite;
	}

	.screen-bezel video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4px;
		display: block;
	}

	/* Scanlines */
	.screen-bezel::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.15) 2px,
			rgba(0, 0, 0, 0.15) 4px
		);
		pointer-events: none;
		z-index: 1;
		border-radius: 4px;
	}

	/* Glass reflection */
	.screen-bezel::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.08) 0%,
			transparent 40%,
			transparent 100%
		);
		pointer-events: none;
		z-index: 2;
		border-radius: 4px;
	}

	.screen-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.screen-buttons button {
		background: linear-gradient(180deg, #2a2a2a, #1e1e1e);
		border: none;
		border-radius: 6px;
		color: #888;
		padding: 12px;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 2px;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
		cursor: pointer;
		transition: all 0.15s ease;
		width: 100%;
		height: auto;
	}

	.screen-buttons button:hover {
		color: #aaa;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 0 10px rgba(100, 180, 255, 0.2);
		transform: none;
	}

	.screen-buttons button:active {
		transform: scale(0.97);
		transition-duration: 0.08s;
	}

	/* ============================================
	   PAD GRID
	   ============================================ */
	.pad-grid {
		grid-area: pads;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 12px;
		padding: 8px;
	}

	.pad-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		animation: pad-boot 0.5s ease both;
	}

	.pad-btn {
		width: 100%;
		aspect-ratio: 1;
		border: none;
		border-radius: 6px;
		background:
			radial-gradient(circle, transparent 0.8px, rgba(0, 0, 0, 0.03) 0.8px) 0 0 / 3px 3px,
			radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
			linear-gradient(180deg, #2a2a2a, #1e1e1e, #222);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.5),
			inset 0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 12px color-mix(in srgb, var(--pad-color) 40%, transparent);
		cursor: pointer;
		transition: all 0.15s ease;
		font-size: 0;
	}

	.pad-btn:hover {
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.5),
			inset 0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 16px color-mix(in srgb, var(--pad-color) 60%, transparent),
			0 0 30px color-mix(in srgb, var(--pad-color) 30%, transparent),
			0 0 50px color-mix(in srgb, var(--pad-color) 15%, transparent);
		transform: none;
	}

	.pad-btn:active {
		transform: scale(0.97);
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.5),
			inset 0 3px 6px rgba(0, 0, 0, 0.5),
			0 0 8px color-mix(in srgb, var(--pad-color) 30%, transparent);
		transition-duration: 0.08s;
	}

	.pad-label {
		font-size: 10px;
		letter-spacing: 2px;
		color: #555;
		text-transform: uppercase;
	}

	/* Pad colors */
	.pad-1 {
		--pad-color: #e8731a;
	}
	.pad-2 {
		--pad-color: #d4651a;
	}
	.pad-3 {
		--pad-color: #c05818;
	}
	.pad-4 {
		--pad-color: #ab4b16;
	}
	.pad-5 {
		--pad-color: #00bcd4;
	}
	.pad-6 {
		--pad-color: #009688;
	}
	.pad-7 {
		--pad-color: #26c6da;
	}
	.pad-8 {
		--pad-color: #00897b;
	}
	.pad-9 {
		--pad-color: #ff1744;
	}
	.pad-10 {
		--pad-color: #00e676;
	}
	.pad-11 {
		--pad-color: #ffd600;
	}
	.pad-12 {
		--pad-color: #ffffff;
	}
	.pad-13 {
		--pad-color: #ff4081;
	}
	.pad-14 {
		--pad-color: #9c27b0;
	}
	.pad-15 {
		--pad-color: #7c4dff;
	}
	.pad-16 {
		--pad-color: #e0e0e0;
	}

	/* Pad boot stagger delays (L→R, T→B) */
	.pad-1 {
		animation-delay: 100ms;
	}
	.pad-2 {
		animation-delay: 150ms;
	}
	.pad-3 {
		animation-delay: 200ms;
	}
	.pad-4 {
		animation-delay: 250ms;
	}
	.pad-5 {
		animation-delay: 300ms;
	}
	.pad-6 {
		animation-delay: 350ms;
	}
	.pad-7 {
		animation-delay: 400ms;
	}
	.pad-8 {
		animation-delay: 450ms;
	}
	.pad-9 {
		animation-delay: 500ms;
	}
	.pad-10 {
		animation-delay: 550ms;
	}
	.pad-11 {
		animation-delay: 600ms;
	}
	.pad-12 {
		animation-delay: 650ms;
	}
	.pad-13 {
		animation-delay: 700ms;
	}
	.pad-14 {
		animation-delay: 750ms;
	}
	.pad-15 {
		animation-delay: 800ms;
	}
	.pad-16 {
		animation-delay: 850ms;
	}

	/* Rec pad continuous pulse */
	.pad-9 .pad-btn {
		animation: rec-pulse 2s ease-in-out infinite;
		animation-delay: 1s;
	}

	/* ============================================
	   CONTROLS COLUMN
	   ============================================ */
	.controls-column {
		grid-area: controls;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 12px 0;
		animation: boot-in 0.5s ease both;
		animation-delay: 400ms;
	}

	.speaker-housing {
		color: #555;
		width: 100%;
		display: grid;
		place-items: center;
		flex: 1;
	}

	.speaker-housing :global(svg) {
		animation: bass-pulse 2s ease-in-out infinite;
	}

	.volume-knob-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	.knob {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #555, #333, #222, #1a1a1a);
		box-shadow:
			0 2px 8px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		position: relative;
		cursor: grab;
		transition: transform 0.4s ease;
	}

	.knob::after {
		content: '';
		position: absolute;
		width: 2px;
		height: 14px;
		background: #888;
		top: 6px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 1px;
	}

	.knob:hover {
		transform: rotate(30deg);
	}

	.knob-label {
		font-size: 10px;
		letter-spacing: 2px;
		color: #555;
		text-transform: uppercase;
	}

	.social-icons {
		display: flex;
		gap: 12px;
	}

	.social-icons a {
		color: #555;
		transition: color 0.2s ease;
		display: grid;
		place-items: center;
	}

	.social-icons a:hover {
		color: #888;
	}

	/* ============================================
	   CROSSFADER
	   ============================================ */
	.crossfader {
		grid-area: slider;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 0 40px;
		background: linear-gradient(180deg, #1a1a1a, #222, #1e1e1e);
		border-radius: 4px;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
		animation: boot-in 0.5s ease both;
		animation-delay: 900ms;
	}

	.crossfader-label {
		font-size: 10px;
		letter-spacing: 2px;
		color: #444;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.crossfader input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background: linear-gradient(180deg, #111, #1a1a1a);
		border-radius: 4px;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.8);
		outline: none;
	}

	.crossfader input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 50px;
		height: 28px;
		border-radius: 4px;
		background: linear-gradient(180deg, #555, #444, #333);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		cursor: grab;
	}

	.crossfader input[type='range']::-moz-range-thumb {
		width: 50px;
		height: 28px;
		border-radius: 4px;
		border: none;
		background: linear-gradient(180deg, #555, #444, #333);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		cursor: grab;
	}

	/* ============================================
	   MASONRY GALLERY (preserved)
	   ============================================ */
	.masonry-grid {
		column-count: 2;
		column-gap: 1rem;
		margin: 0;
	}

	.masonry-item {
		break-inside: avoid;
		margin-bottom: 1rem;
		display: inline-block;
		width: 100%;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
		transition-delay: var(--reveal-delay, 0ms);
	}

	.masonry-item:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (min-width: 768px) {
		.masonry-grid {
			column-count: 3;
			column-gap: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.masonry-grid {
			column-count: 4;
			column-gap: 2rem;
		}
	}

	/* ============================================
	   MOBILE LAYOUT
	   ============================================ */
	@media (max-width: 767px) {
		.ctrl-container {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto 1fr auto auto;
			grid-template-areas:
				'brand'
				'screen'
				'pads'
				'controls'
				'slider';
			min-height: auto;
			padding: 12px;
			gap: 12px;
		}

		.brand-plate {
			padding: 0 12px;
		}

		.brand-text {
			display: none;
		}

		.pad-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(8, 1fr);
		}

		.controls-column {
			flex-direction: row;
			justify-content: space-around;
			padding: 12px;
		}

		.speaker-housing {
			flex: 0;
			width: auto;
		}

		.crossfader {
			padding: 0 20px;
		}

		.corner-screw {
			display: none;
		}

		.screen-buttons button {
			font-size: 16px;
			padding: 8px;
		}
	}
</style>
