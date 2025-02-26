<script lang="ts">
	import MidiScreen from '$lib/MidiScreen.svelte';
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
	import Turntable from '$lib/Turntable.svelte';
</script>

<div class="font-jersey grid min-h-screen place-items-center bg-teal-950 px-6">
	<div class="w-full max-w-[1000px] rounded-lg border-3 border-black bg-teal-800 p-4">
		<div class="grid gap-2 text-xl text-teal-100 md:grid-cols-[1fr_1fr_4fr]">
			<div class="grid grid-rows-[2rem_auto] gap-2">
				<div class="midi grid place-items-center">about</div>
				<div
					class="hidden max-h-[300px] items-center justify-center rounded-lg border-2 border-black p-2 md:flex"
				>
					<input type="range" min="0" max="100" value="0" class="range-slider" id="color-slider" />
				</div>

				<SpeakerGrate />
			</div>
			<div class="flex flex-col gap-2">
				<div class="midi grid h-full place-items-center">
					<p>facilities</p>
				</div>
				<div class="midi grid h-full place-items-center">
					<p>services</p>
				</div>
				<div class="midi grid h-full place-items-center">
					<p>opportunities</p>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<MidiScreen />
				<Turntable />
			</div>
		</div>
	</div>
</div>

<style>
	input[type='range'] {
		height: 100%;
		writing-mode: vertical-lr;
		direction: rtl;
		appearance: slider-vertical;
		width: 16px;
		vertical-align: bottom;
		background: transparent;
	}
	input[type='range']::-moz-range-track {
		background: red;
	}
</style>
