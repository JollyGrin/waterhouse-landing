<script lang="ts">
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
</script>

{#snippet screen()}
	<div class="min-h-40 w-full rounded bg-black md:min-h-50"></div>
{/snippet}
{#snippet mainButtons()}
	<button class="rounded-lg">studios</button>
	<button class="rounded-lg">ateliers</button>
{/snippet}

<div
	class="ctrl-container container mx-auto w-full overflow-clip rounded-xl border-2 bg-slate-50 p-2 md:min-h-[300px]"
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
			class="relative grid h-[60%] w-[60%] place-items-center rounded-full border-2 bg-white shadow-[2px_2px_0_black]"
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
		<button class="rounded-lg"> location </button>
	</div>
	<div class="contact">
		<button class="rounded-lg"> contact </button>
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
		<button class="rounded-lg"> s1 </button>
	</div>
	<div class="social-2">
		<button class="rounded-lg"> s2 </button>
	</div>
	<div class="social-3">
		<button class="rounded-lg"> s3 </button>
	</div>
	<div class="social-4">
		<button class="rounded-lg"> s4 </button>
	</div>
	<div class="special hidden md:grid">
		<button class="rounded-lg"> special </button>
	</div>
	<div class="sample hidden md:grid">
		<button class="rounded-lg"> sample </button>
	</div>
	<div class="drum hidden md:grid">
		<button class="rounded-lg"> drum </button>
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
			'slider volume social-1 social-2 social-3 social-4 news news';
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
				'social-1 social-2 social-3 social-4';
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
