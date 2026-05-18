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
	import Nav from '$lib/Nav.svelte';
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

{#snippet screen()}
	<div class="lcd relative grid min-h-40 w-full place-items-center overflow-hidden rounded md:min-h-50">
		<video src="/screen.mp4" autoplay muted loop class="lcd-video relative z-0 h-50 object-cover"
		></video>
		<div class="lcd-scanlines pointer-events-none absolute inset-0 z-10"></div>
		<div class="lcd-hud pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-2 md:p-3">
			<div class="lcd-row flex items-center justify-between text-[0.6rem] tracking-[0.18em] md:text-xs">
				<span class="flex items-center gap-1.5">
					<span class="led-rec"></span>
					<span>REC</span>
				</span>
				<span class="hidden md:inline">WH—08 · DRUM SAMPLER</span>
				<span class="md:hidden">WH—08</span>
				<span>90.00 BPM</span>
			</div>
			<div class="lcd-steps flex items-end gap-1.5">
				<span class="step"></span>
				<span class="step"></span>
				<span class="step"></span>
				<span class="step"></span>
				<span class="step"></span>
				<span class="step"></span>
				<span class="step"></span>
				<span class="step"></span>
			</div>
		</div>
		<div class="lcd-glow pointer-events-none absolute inset-0 z-30 rounded"></div>
	</div>
{/snippet}
{#snippet mainButtons()}
	<button class="sm:text-medium rounded-lg text-5xl" onclick={() => (isModalOpen = 'studios')}
		>studios</button
	>
	<button class="sm:text-medium rounded-lg text-5xl" onclick={() => (isModalOpen = 'offices')}
		>ateliers</button
	>
{/snippet}

<ModalMusicStudio {onClose} {onOpenJoin} isOpen={isModalOpen === 'studios'} />
<ModalOffice {onClose} {onOpenJoin} isOpen={isModalOpen === 'offices'} />
<ModalServices {onClose} isOpen={isModalOpen === 'services'} />
<ModalStream {onClose} {onOpenJoin} isOpen={isModalOpen === 'stream'} />
<ModalOpportunities {onClose} isOpen={isModalOpen === 'opportunities'} />
<ModalSendEmail {onClose} isOpen={isModalOpen === 'join'} />
<ModalAbout {onClose} isOpen={isModalOpen === 'about'} />
<ModalVideo {onClose} isOpen={isModalOpen === 'video'} youtubeId="uZip-SKOwF4" />

<Nav
	onOpenAbout={() => (isModalOpen = 'about')}
	onOpenStudio={() => (isModalOpen = 'studios')}
	onOpenAtelier={() => (isModalOpen = 'offices')}
/>

<!-- Hidden SEO content for search engines -->
<SEOContent content={allSeoContent} />

<!-- Mobile-only video banner -->
<div
	class="from-highlight text-primary font-jersey mb-1 bg-gradient-to-b to-white px-4 py-3 text-center md:hidden"
>
	<button
		class="flex w-full items-center justify-center gap-2 text-lg text-black"
		onclick={() => (isModalOpen = 'video')}
	>
		<span>What is Waterhouse?</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<polygon points="5 3 19 12 5 21 5 3"></polygon>
		</svg>
		<span>Play Video</span>
	</button>
</div>

<div
	class="machine font-jersey container relative mx-auto w-full overflow-hidden rounded-xl border-2 bg-slate-50"
>
	<!-- Hardware corner rivets -->
	<span class="rivet rivet-tl" aria-hidden="true"></span>
	<span class="rivet rivet-tr" aria-hidden="true"></span>
	<span class="rivet rivet-bl" aria-hidden="true"></span>
	<span class="rivet rivet-br" aria-hidden="true"></span>

	<!-- Top brand strip (desktop only) -->
	<div class="machine-strip strip-top hidden md:flex">
		<div class="strip-cell strip-left">
			<span class="led led-power" aria-hidden="true"></span>
			<span>POWER</span>
		</div>
		<div class="strip-cell strip-center">
			<span class="strip-brand">WATERHOUSE</span>
			<span class="strip-sep">·</span>
			<span>WH—08</span>
			<span class="strip-sep">·</span>
			<span>DRUM SAMPLER</span>
			<span class="strip-sep">·</span>
			<span>AMSTERDAM</span>
		</div>
		<div class="strip-cell strip-right">
			<span>MIDI IN</span>
			<span class="jack" aria-hidden="true"></span>
			<span>OUT</span>
			<span class="jack" aria-hidden="true"></span>
		</div>
	</div>

	<div class="ctrl-container p-3 text-xl md:min-h-[300px] md:p-3 xl:text-4xl">
		<div class="buttons flex flex-col gap-2 md:hidden">
			{@render mainButtons()}
		</div>
		<div class="screen flex flex-col gap-2">
			{@render screen()}
			<div class="hidden h-full grid-cols-2 gap-2 md:grid md:text-4xl xl:text-7xl">
				{@render mainButtons()}
			</div>
		</div>
		<div class="news grid place-items-center">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative grid h-full w-full grid-cols-2 gap-2 md:h-[50%] md:w-full md:grid-cols-1 md:gap-0"
			>
				<a href="https://www.instagram.com/waterhousestudiosamsterdam" class="h-full w-full">
					<button class="grid h-full place-items-center rounded-xl">
						<IconInstagram w={35} className="md:h-[50px] md:w-[50px]" />
					</button>
				</a>
				<a href="https://www.twitch.tv/waterhousestudios" class="h-full w-full">
					<button class="grid h-full place-items-center rounded-xl">
						<IconTwitch w={35} class="md:h-[50px] md:w-[50px]" />
					</button>
				</a>
			</div>
		</div>
		<div class="slider">
			<div class="relative grid h-full w-full place-items-center rounded-lg border-2">
				<input
					type="range"
					min="0"
					max="100"
					value="0"
					class="range-slider h-[calc(100%-20px)]"
					id="color-slider"
				/>
				<div class="slider-scale pointer-events-none absolute inset-y-3 right-1 hidden flex-col justify-between md:flex">
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
					<span class="scale-tick"></span>
				</div>
				<span class="slider-label pointer-events-none absolute top-1 left-1 hidden md:block">LVL</span>
				<span class="slider-value pointer-events-none absolute bottom-1 left-1 hidden md:block">000</span>
			</div>
		</div>
		<div class="location">
			<a href="https://maps.app.goo.gl/nkE2XhCBkjkw9suY6" target="_blank">
				<button class="grid place-items-center rounded-lg">
					<span class="micro-label">LOC</span>
					<IconLocation width="60%" height="60%" />
				</button>
			</a>
		</div>
		<div class="contact">
			<button class="grid place-items-center rounded-lg" onclick={() => (isModalOpen = 'join')}>
				<span class="micro-label">MSG</span>
				<IconEmail width="60%" height="60%" />
			</button>
		</div>
		<div class="rec hidden place-items-center md:grid">
			<a
				href="https://hours.waterhousestudios.nl"
				target="_blank"
				rel="noopener noreferrer"
				class="grid h-full w-full place-items-center"
			>
				<button class="round-btn rounded-full">
					<span class="round-led round-led-amber" aria-hidden="true"></span>
					loop
					<span class="round-sub">/ 8 BAR</span>
				</button>
			</a>
		</div>
		<div class="play hidden md:grid">
			<button class="round-btn rounded-full" onclick={() => (isModalOpen = 'video')}>
				<span class="round-led round-led-rec" aria-hidden="true"></span>
				play
				<span class="round-sub">▶ DEMO</span>
			</button>
		</div>
		<div class="volume hidden place-items-center md:grid">
			<div class="knob-wrap">
				<div class="knob-ticks" aria-hidden="true">
					<span class="tick" style="--i: 0"></span>
					<span class="tick" style="--i: 1"></span>
					<span class="tick" style="--i: 2"></span>
					<span class="tick" style="--i: 3"></span>
					<span class="tick tick-major" style="--i: 4"></span>
					<span class="tick" style="--i: 5"></span>
					<span class="tick" style="--i: 6"></span>
					<span class="tick" style="--i: 7"></span>
					<span class="tick" style="--i: 8"></span>
					<span class="tick" style="--i: 9"></span>
					<span class="tick" style="--i: 10"></span>
				</div>
				<div class="knob relative h-20 w-20 rounded-full border-2 bg-white shadow-[2px_2px_0_black]">
					<div class="absolute left-[49%] h-10 w-1 rounded-b-full border-l-4"></div>
				</div>
				<span class="knob-label">GAIN</span>
			</div>
		</div>
		<div class="social-1">
			<button class="rounded-lg" onclick={() => (isModalOpen = 'services')}>
				<span class="micro-label">FX A</span>
				services
			</button>
		</div>
		<div class="social-2">
			<button class="rounded-lg" onclick={() => (isModalOpen = 'opportunities')}>
				<span class="micro-label">FX B</span>
				benefits
			</button>
		</div>
		<div class="social-3">
			<button class="rounded-lg" onclick={() => (isModalOpen = 'stream')}>
				<span class="micro-label micro-label-live">
					<span class="dot-live" aria-hidden="true"></span>
					LIVE
				</span>
				stream
			</button>
		</div>
		<div class="special hidden md:grid">
			<button class="rounded-lg" onclick={triggerConfetti}>
				<span class="micro-label">FX</span>
				special
			</button>
		</div>
		<div class="sample hidden md:grid">
			<button class="rounded-lg" onclick={playSample}>
				<span class="micro-label">02</span>
				sample
			</button>
		</div>
		<div class="drum hidden md:grid">
			<button class="rounded-lg" onclick={playDrum}>
				<span class="micro-label">01</span>
				drum
			</button>
		</div>
		<div class="speaker">
			<SpeakerGrate />
		</div>
	</div>

	<!-- Bottom serial strip (desktop only) -->
	<div class="machine-strip strip-bottom hidden md:flex">
		<span>SERIAL 24·09·NL</span>
		<span class="strip-sep">—</span>
		<span>MADE IN AMSTERDAM</span>
		<span class="strip-sep">—</span>
		<span>24·BIT · 96·kHz</span>
		<span class="strip-sep">—</span>
		<span>© WATERHOUSE STUDIOS</span>
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

<!-- Contact info at bottom -->
<div class="font-jersey mt-8 text-center text-sm opacity-60">
	Have a question? Contact us at <a href="mailto:info@waterhousestudios.nl">
		info@waterhousestudios.nl
	</a>
</div>

<!-- Gallery Masonry Grid -->
<div class="font-jersey mt-8 bg-black px-3 py-4 text-slate-100">
	<div class="masonry-grid">
		{#each galleryImages as image, i}
			<div class="masonry-item">
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
	:root {
		--ctrl-unit: calc(calc(100vw - calc(60 * 2px)) / 89.66);
		--ctrl-grid-height: calc(var(--ctrl-unit) * 10);
		--amber: #ff8c1a;
		--amber-glow: rgba(255, 140, 26, 0.75);
		--amber-dim: rgba(255, 140, 26, 0.18);
		--led-rec: #ff3838;
	}
	input[type='range'] {
		writing-mode: vertical-lr;
		direction: rtl;
		appearance: slider-vertical;
		width: 16px;
		vertical-align: bottom;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #ffd699 0%, var(--amber) 55%, #c46a08 100%);
		box-shadow:
			0 0 8px var(--amber-glow),
			inset 0 1px 1px rgba(255, 255, 255, 0.7),
			0 0 0 1.5px #000;
		cursor: pointer;
	}
	button {
		position: relative;
		width: 100%;
		height: 100%;
		border: solid 2px black;
		box-shadow:
			3px 3px 0 black,
			inset 0 1px 0 rgba(255, 255, 255, 0.95),
			inset 0 -8px 12px -8px rgba(0, 0, 0, 0.18);
		transition: all 0.18s ease;
		background: linear-gradient(180deg, #ffffff 0%, #efece6 100%);
	}
	button:hover {
		transform: translate(2px, 2px);
		box-shadow:
			1px 1px 0px black,
			inset 0 1px 0 rgba(255, 255, 255, 0.95),
			inset 0 -8px 12px -8px rgba(0, 0, 0, 0.18);
	}
	button:active {
		transform: translate(3px, 3px);
		box-shadow:
			0 0 0 black,
			inset 0 2px 6px rgba(0, 0, 0, 0.18);
	}

	/* ----- Machine chrome ----- */
	.machine {
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 1) inset,
			0 -1px 0 rgba(0, 0, 0, 0.05) inset,
			0 20px 40px -24px rgba(0, 0, 0, 0.25),
			0 2px 0 rgba(0, 0, 0, 0.08);
	}
	.ctrl-container {
		position: relative;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(4, var(--ctrl-grid-height));
		gap: 12px;
		grid-auto-flow: row;
		grid-template-areas:
			'location contact screen screen screen screen special speaker'
			'slider rec screen screen screen screen sample drum'
			'slider play screen screen screen screen news news'
			'slider volume social-1 social-3 social-3 social-2 news news';
	}
	.ctrl-container::before {
		content: '';
		position: absolute;
		inset: -6px;
		pointer-events: none;
		background: radial-gradient(
			ellipse at top,
			rgba(0, 0, 0, 0.03) 0%,
			transparent 60%
		);
		z-index: 0;
	}

	/* Corner rivets */
	.rivet {
		position: absolute;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background:
			radial-gradient(circle at 35% 30%, #888 0%, #3a3a3a 50%, #181818 100%);
		box-shadow:
			0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 -1px 1px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		z-index: 4;
	}
	.rivet::after {
		content: '';
		position: absolute;
		inset: 2.5px;
		border-radius: 50%;
		background: linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.18) 50%, transparent 65%);
	}
	.rivet-tl {
		top: 7px;
		left: 7px;
	}
	.rivet-tr {
		top: 7px;
		right: 7px;
	}
	.rivet-bl {
		bottom: 7px;
		left: 7px;
	}
	.rivet-br {
		bottom: 7px;
		right: 7px;
	}

	/* Top + bottom strips */
	.machine-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 6px 32px;
		font-size: 0.65rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.55);
		font-family: var(--font-jersey);
	}
	.strip-top {
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), transparent);
	}
	.strip-bottom {
		justify-content: center;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), transparent);
		gap: 16px;
		font-size: 0.6rem;
	}
	.strip-cell {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.strip-brand {
		font-weight: bold;
		letter-spacing: 0.32em;
		color: #000;
	}
	.strip-sep {
		opacity: 0.35;
	}
	.jack {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #555 0%, #1a1a1a 60%, #000 100%);
		box-shadow:
			inset 0 0 0 1px rgba(0, 0, 0, 0.7),
			inset 0 1px 2px rgba(255, 255, 255, 0.12),
			0 1px 0 rgba(255, 255, 255, 0.5);
		display: inline-block;
	}

	/* LEDs */
	.led {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.led-power {
		background: radial-gradient(circle at 30% 30%, #fff2c8 0%, var(--amber) 55%, #b85800 100%);
		box-shadow:
			0 0 6px var(--amber-glow),
			inset 0 -1px 1px rgba(0, 0, 0, 0.3);
		animation: heartbeat 0.667s ease-in-out infinite;
	}
	@keyframes heartbeat {
		0%,
		60%,
		100% {
			box-shadow:
				0 0 4px rgba(255, 140, 26, 0.4),
				inset 0 -1px 1px rgba(0, 0, 0, 0.3);
			opacity: 0.55;
		}
		8%,
		20% {
			box-shadow:
				0 0 10px var(--amber-glow),
				0 0 16px rgba(255, 140, 26, 0.4),
				inset 0 -1px 1px rgba(0, 0, 0, 0.3);
			opacity: 1;
		}
	}

	/* LCD treatment */
	.lcd {
		background:
			radial-gradient(ellipse at center, #11161d 0%, #060809 100%);
		border: 1.5px solid #000;
		box-shadow:
			inset 0 0 0 1px rgba(255, 154, 60, 0.05),
			inset 0 0 24px rgba(255, 140, 26, 0.18),
			inset 0 0 80px rgba(0, 0, 0, 0.8),
			0 0 0 2px rgba(0, 0, 0, 0.1);
	}
	.lcd-video {
		filter: contrast(1.05) brightness(0.95);
	}
	.lcd-scanlines {
		background-image: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.32) 0px,
			rgba(0, 0, 0, 0.32) 1px,
			transparent 1px,
			transparent 3px
		);
		mix-blend-mode: multiply;
		opacity: 0.85;
	}
	.lcd-glow {
		box-shadow:
			inset 0 0 30px rgba(255, 154, 60, 0.2),
			inset 0 0 120px rgba(0, 0, 0, 0.45);
	}
	.lcd-hud {
		color: #ffa340;
		font-family: var(--font-jersey);
		text-shadow:
			0 0 4px rgba(255, 140, 26, 0.7),
			0 0 8px rgba(255, 140, 26, 0.3);
	}
	.led-rec {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--led-rec);
		box-shadow: 0 0 6px var(--led-rec);
		animation: rec-blink 1.334s ease-in-out infinite;
	}
	@keyframes rec-blink {
		0%,
		45%,
		100% {
			opacity: 1;
			box-shadow: 0 0 8px var(--led-rec);
		}
		50%,
		95% {
			opacity: 0.25;
			box-shadow: 0 0 3px rgba(255, 56, 56, 0.4);
		}
	}
	.lcd-steps {
		height: 5px;
	}
	.lcd-steps .step {
		flex: 1;
		height: 5px;
		background: var(--amber-dim);
		border-radius: 1px;
		animation: step-pulse 2.667s linear infinite;
	}
	@keyframes step-pulse {
		0%,
		11% {
			background: var(--amber);
			box-shadow: 0 0 6px var(--amber-glow);
		}
		12%,
		100% {
			background: var(--amber-dim);
			box-shadow: none;
		}
	}
	.lcd-steps .step:nth-child(1) {
		animation-delay: 0s;
	}
	.lcd-steps .step:nth-child(2) {
		animation-delay: 0.333s;
	}
	.lcd-steps .step:nth-child(3) {
		animation-delay: 0.667s;
	}
	.lcd-steps .step:nth-child(4) {
		animation-delay: 1s;
	}
	.lcd-steps .step:nth-child(5) {
		animation-delay: 1.333s;
	}
	.lcd-steps .step:nth-child(6) {
		animation-delay: 1.667s;
	}
	.lcd-steps .step:nth-child(7) {
		animation-delay: 2s;
	}
	.lcd-steps .step:nth-child(8) {
		animation-delay: 2.333s;
	}

	/* Micro-labels on buttons */
	.micro-label {
		position: absolute;
		top: 6px;
		left: 8px;
		font-size: 0.55rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		opacity: 0.5;
		font-family: var(--font-jersey);
		line-height: 1;
		pointer-events: none;
	}
	.micro-label-live {
		display: flex;
		align-items: center;
		gap: 4px;
		opacity: 1;
		color: var(--led-rec);
		font-weight: bold;
	}
	.dot-live {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--led-rec);
		box-shadow: 0 0 4px var(--led-rec);
		animation: rec-blink 1.334s ease-in-out infinite;
	}

	/* Round buttons (play, loop) — LED + sub label */
	.round-btn {
		position: relative;
	}
	.round-led {
		position: absolute;
		top: 12px;
		left: 50%;
		transform: translateX(-50%);
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
	.round-led-amber {
		background: var(--amber);
		box-shadow: 0 0 5px var(--amber-glow);
		animation: heartbeat 0.667s ease-in-out infinite;
	}
	.round-led-rec {
		background: var(--led-rec);
		box-shadow: 0 0 5px var(--led-rec);
		animation: rec-blink 1.334s ease-in-out infinite;
	}
	.round-sub {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.55rem;
		letter-spacing: 0.15em;
		opacity: 0.5;
		white-space: nowrap;
	}

	/* Volume knob with tick marks */
	.knob-wrap {
		position: relative;
		width: 110px;
		height: 110px;
		display: grid;
		place-items: center;
	}
	.knob {
		background:
			radial-gradient(circle at 30% 25%, #ffffff 0%, #f3eee3 60%, #d8d1c3 100%);
		box-shadow:
			2px 2px 0 black,
			inset 0 2px 4px rgba(255, 255, 255, 0.9),
			inset 0 -4px 6px rgba(0, 0, 0, 0.08);
	}
	.knob-ticks {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.knob-ticks .tick {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 5px;
		background: rgba(0, 0, 0, 0.55);
		border-radius: 1px;
		transform-origin: center center;
		transform:
			translate(-50%, -50%)
			rotate(calc(-135deg + (var(--i) * 27deg)))
			translateY(-52px);
	}
	.knob-ticks .tick-major {
		height: 8px;
		width: 2.5px;
		background: var(--amber);
		box-shadow: 0 0 4px var(--amber-glow);
	}
	.knob-label {
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.55rem;
		letter-spacing: 0.25em;
		opacity: 0.55;
		font-family: var(--font-jersey);
	}

	/* Slider scale */
	.slider-scale {
		width: 6px;
	}
	.slider-scale .scale-tick {
		display: block;
		width: 6px;
		height: 1px;
		background: rgba(0, 0, 0, 0.45);
	}
	.slider-scale .scale-tick:nth-child(2n + 1) {
		width: 8px;
		background: rgba(0, 0, 0, 0.7);
	}
	.slider-label,
	.slider-value {
		font-size: 0.5rem;
		letter-spacing: 0.2em;
		opacity: 0.55;
		font-family: var(--font-jersey);
	}
	.slider-value {
		color: var(--amber);
		opacity: 0.85;
		text-shadow: 0 0 4px rgba(255, 140, 26, 0.4);
	}

	@media (max-width: 767px) {
		.ctrl-container {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 0.5fr 0.5fr 1.75fr 0.5fr;
			gap: 8px;
			grid-auto-flow: row;
			grid-template-areas:
				'screen screen screen screen'
				'location contact news speaker'
				'slider buttons buttons buttons'
				'social-1 social-2 social-3 social-3';
		}
	}

	.screen {
		grid-area: screen;
	}

	.buttons {
		grid-area: buttons;
	}

	.news {
		grid-area: news;
	}

	.slider {
		grid-area: slider;
	}

	.location {
		grid-area: location;
	}

	.contact {
		grid-area: contact;
	}

	.rec {
		grid-area: rec;
	}

	.play {
		grid-area: play;
	}

	.volume {
		grid-area: volume;
	}

	.social-1 {
		grid-area: social-1;
	}

	.social-2 {
		grid-area: social-2;
	}

	.social-3 {
		grid-area: social-3;
	}

	.social-4 {
		grid-area: social-4;
	}

	.special {
		grid-area: special;
	}

	.sample {
		grid-area: sample;
	}

	.drum {
		grid-area: drum;
	}

	.speaker {
		grid-area: speaker;
	}

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
</style>
