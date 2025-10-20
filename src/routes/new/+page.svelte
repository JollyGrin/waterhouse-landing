<script lang="ts">
	import IconEmail from '$lib/icon/IconEmail.svelte';
	import IconLocation from '$lib/icon/IconLocation.svelte';
	import ModalMusicStudio from '$lib/modal/ModalMusicStudio.svelte';
	import ModalOffice from '$lib/modal/ModalOffice.svelte';
	import ModalOpportunities from '$lib/modal/ModalOpportunities.svelte';
	import ModalSendEmail from '$lib/modal/ModalSendEmail.svelte';
	import ModalServices from '$lib/modal/ModalServices.svelte';
	import ModalStream from '$lib/modal/ModalStream.svelte';
	import Nav from '$lib/Nav.svelte';
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
	import { confetti } from 'svelte-confetti';

	let isModalOpen:
		| null
		| 'studios'
		| 'offices'
		| 'stream'
		| 'services'
		| 'opportunities'
		| 'stream'
		| 'join' = $state(null);
	const onClose = () => (isModalOpen = null);
	const onOpenJoin = () => (isModalOpen = 'join');

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

	function triggerConfetti() {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		});
	}
</script>

{#snippet screen()}
	<div class="grid min-h-40 w-full place-items-center rounded bg-black md:min-h-50">
		<video src="/screen.mp4" autoplay muted loop class="h-50 object-cover"></video>
	</div>
{/snippet}
{#snippet mainButtons()}
	<button class="rounded-lg" onclick={() => (isModalOpen = 'studios')}>studios</button>
	<button class="rounded-lg" onclick={() => (isModalOpen = 'offices')}>ateliers</button>
{/snippet}

<ModalMusicStudio {onClose} {onOpenJoin} isOpen={isModalOpen === 'studios'} />
<ModalOffice {onClose} {onOpenJoin} isOpen={isModalOpen === 'offices'} />
<ModalServices {onClose} isOpen={isModalOpen === 'services'} />
<ModalStream {onClose} {onOpenJoin} isOpen={isModalOpen === 'stream'} />
<ModalOpportunities {onClose} isOpen={isModalOpen === 'opportunities'} />
<ModalSendEmail {onClose} isOpen={isModalOpen === 'join'} />

<Nav
	onOpenStudio={() => (isModalOpen = 'studios')}
	onOpenAtelier={() => (isModalOpen = 'offices')}
/>

<div
	class="ctrl-container font-jersey container mx-auto w-full overflow-clip rounded-xl border-2 bg-slate-50 p-3 text-xl md:min-h-[300px] md:p-2 xl:text-4xl"
>
	<div class="buttons flex flex-col gap-2 md:hidden">
		{@render mainButtons()}
	</div>
	<div class="screen flex flex-col gap-2">
		{@render screen()}
		<div class="hidden h-full grid-cols-2 gap-2 md:grid">
			{@render mainButtons()}
		</div>
	</div>
	<div class="news grid place-items-center">
		<div
			class="relative grid h-full w-full place-items-center rounded-full border-2 bg-white shadow-[2px_2px_0_black] md:h-[60%] md:w-[60%]"
		>
			news
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
		<button class="grid place-items-center rounded-lg">
			<IconLocation width="60%" height="60%" />
		</button>
	</div>
	<div class="contact">
		<button class="grid place-items-center rounded-lg">
			<IconEmail width="60%" height="60%" />
		</button>
	</div>
	<div class="rec hidden place-items-center md:grid">
		<button class="rounded-full"> rec </button>
	</div>
	<div class="play hidden md:grid">
		<button class="rounded-full"> play </button>
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
</style>
