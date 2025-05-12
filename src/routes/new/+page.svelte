<script lang="ts">
</script>

<div
	class="container mx-auto mt-10 min-h-[300px] w-full overflow-clip rounded-xl border-2 bg-slate-50 p-2"
>
	<div class="screen bg-gray-200"></div>
	<div class="news"></div>
	<div class="slider">
		<div class="h-full w-full rounded-lg border-2"></div>
	</div>
	<div class="location">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="contact">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="rec grid place-items-center">
		<button class="rounded-full"> x </button>
	</div>
	<div class="play">
		<button class="rounded-full"> x </button>
	</div>
	<div class="volume grid place-items-center">
		<div class="relative h-20 w-20 rounded-full border-2 bg-white shadow-[2px_2px_0_black]">
			<div class="absolute left-[49%] h-10 w-1 rounded-b-full border-l-4"></div>
		</div>
	</div>
	<div class="social-1">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="social-2">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="social-3">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="social-4">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="special">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="sample">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="drum">
		<button class="rounded-lg"> x </button>
	</div>
	<div class="speaker"></div>
</div>

<style>
	:root {
		--ctrl-unit: calc(calc(100vw - calc(60 * 2px)) / 89.66);
		--ctrl-grid-height: calc(var(--ctrl-unit) * 10);
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

	.container {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(4, var(--ctrl-grid-height));
		gap: 8px;
		grid-auto-flow: row;
		grid-template-areas:
			'location contact screen screen screen screen special speaker'
			'slider rec screen screen screen screen sample drum'
			'slider play screen screen screen screen news news'
			'slider volume social-1 social-2 social-3 social-4 news news';
	}

	.screen {
		grid-area: screen;
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
