<script lang="ts">
	import IconLogo from '$lib/icon/IconLogo.svelte';
	import MidiScreen from '$lib/MidiScreen.svelte';
	import MidiSlider from '$lib/MidiSlider.svelte';
	import ModalFacilities from '$lib/modal/ModalFacilities.svelte';
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
	import Turntable from '$lib/Turntable.svelte';

	let isOpen: 'facilities' | 'services' | 'opportunities' | null = $state(null);
	const onClose = () => (isOpen = null);
</script>

<ModalFacilities isOpen={isOpen === 'facilities'} {onClose} />

<div
	class="font-jersey grid gap-4 bg-teal-950 px-4 pt-4 md:min-h-screen md:place-items-center md:gap-0 md:px-6 md:pt-0"
>
	<div class="grid h-full min-h-30 place-items-center md:hidden">
		<div class="w-20 text-teal-600">
			<IconLogo />
		</div>
		<p class="text-xl text-teal-600/50">rent a musical studio in amsterdam</p>
	</div>
	<div class="w-full max-w-[1000px] rounded-lg border-3 border-black bg-teal-800 p-4">
		<div class="grid gap-2 text-xl text-teal-100 md:grid-cols-[1fr_1fr_4fr]">
			<div class="flex justify-between gap-2 md:flex-col-reverse">
				<div
					class="midi grid w-full flex-grow place-items-center bg-teal-600 text-teal-900 transition-all hover:bg-teal-300 hover:text-teal-700 active:bg-teal-300 active:text-teal-700"
				>
					join
				</div>
				<div class="midi grid w-full flex-grow place-items-center">about</div>

				<div
					class="shadow-flat translate-adjust hidden max-h-[300px] items-center justify-center rounded-lg border-2 border-black px-2 py-6 md:flex"
				>
					<MidiSlider />
				</div>

				<SpeakerGrate />
			</div>
			<div class="flex gap-2 md:flex-col">
				<button
					class="midi grid h-full flex-grow place-items-center"
					onclick={() => (isOpen = 'facilities')}
				>
					<p>facilities</p>
				</button>
				<div class="midi grid h-full flex-grow place-items-center">
					<p>services</p>
				</div>
				<div class="midi grid h-full flex-grow place-items-center">
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
