<script lang="ts">
</script>

<div class="container mx-auto mt-10 min-h-[300px] w-full border-2">
	<div class="screen bg-gray-200"></div>
	<div class="news"></div>
	<div class="slider"></div>
	<div class="location"></div>
	<div class="contact"></div>
	<div class="rec"></div>
	<div class="play"></div>
	<div class="volume"></div>
	<div class="social-1"></div>
	<div class="social-2"></div>
	<div class="social-3"></div>
	<div class="social-4"></div>
	<div class="special"></div>
	<div class="sample"></div>
	<div class="drum"></div>
	<div class="speaker"></div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(4, 176px);
		gap: 0px 0px;
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
