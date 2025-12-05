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
	<div class="grid min-h-40 w-full place-items-center rounded bg-black md:min-h-50">
		<video src="/screen.mp4" autoplay muted loop class="h-50 object-cover"></video>
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
<ModalVideo {onClose} isOpen={isModalOpen === 'video'} videoSrc="/tour.mp4" />

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
	class="ctrl-container font-jersey container mx-auto w-full overflow-clip rounded-xl border-2 bg-slate-50 p-3 text-xl md:min-h-[300px] md:p-2 xl:text-4xl"
>
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
		</div>
	</div>
	<div class="location">
		<a href="https://maps.app.goo.gl/nkE2XhCBkjkw9suY6" target="_blank">
			<button class="grid place-items-center rounded-lg">
				<IconLocation width="60%" height="60%" />
			</button>
		</a>
	</div>
	<div class="contact">
		<button class="grid place-items-center rounded-lg" onclick={() => (isModalOpen = 'join')}>
			<IconEmail width="60%" height="60%" />
		</button>
	</div>
	<div class="rec hidden place-items-center md:grid">
		<button class="rounded-full" onclick={comingSoon}> rec </button>
	</div>
	<div class="play hidden md:grid">
		<button class="rounded-full" onclick={() => (isModalOpen = 'video')}> play </button>
	</div>
	<div class="volume hidden place-items-center md:grid">
		<div class="relative h-20 w-20 rounded-full border-2 bg-white shadow-[2px_2px_0_black]">
			<div class="absolute left-[49%] h-10 w-1 rounded-b-full border-l-4"></div>
		</div>
	</div>
	<div class="social-1">
		<button class="rounded-lg" onclick={() => (isModalOpen = 'services')}> services </button>
	</div>
	<div class="social-2">
		<button class="rounded-lg" onclick={() => (isModalOpen = 'opportunities')}> benefits </button>
	</div>
	<div class="social-3">
		<button class="rounded-lg" onclick={() => (isModalOpen = 'stream')}> stream </button>
	</div>
	<!-- <div class="social-4"> -->
	<!-- 	<button class="rounded-lg"> s4 </button> -->
	<!-- </div> -->
	<div class="special hidden md:grid">
		<button class="rounded-lg" onclick={triggerConfetti}> special </button>
	</div>
	<div class="sample hidden md:grid">
		<button class="rounded-lg" onclick={playSample}> sample </button>
	</div>
	<div class="drum hidden md:grid">
		<button class="rounded-lg" onclick={playDrum}> drum </button>
	</div>
	<div class="speaker">
		<SpeakerGrate />
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
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: #04aa6d;
		cursor: pointer;
	}
	button {
		width: 100%;
		height: 100%;
		border: solid 2px black;
		box-shadow: 3px 3px 0 black;
		transition: all 0.25s ease;
		background-color: var(--color-white);
	}
	button:hover {
		transform: translate(2px, 2px);
		box-shadow: 1px 1px 0px black;
	}

	.ctrl-container {
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
