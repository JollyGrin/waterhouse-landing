<script lang="ts">
	import IconLogo from '$lib/icon/IconLogo.svelte';
	import MidiScreen from '$lib/MidiScreen.svelte';
	import MidiSlider from '$lib/MidiSlider.svelte';
	import ModalFacilities from '$lib/modal/ModalFacilities.svelte';
	import ModalOpportunities from '$lib/modal/ModalOpportunities.svelte';
	import ModalPrices from '$lib/modal/ModalPrices.svelte';
	import ModalSendEmail from '$lib/modal/ModalSendEmail.svelte';
	import ModalServices from '$lib/modal/ModalServices.svelte';
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
	import Turntable from '$lib/Turntable.svelte';

	type ModalKey = 'contact' | 'facilities' | 'services' | 'opportunities' | 'prices';
	let isOpen: ModalKey | null = $state(null);
	const onClose = () => (isOpen = null);
	const onOpenContact = () => (isOpen = 'contact');
</script>

<ModalSendEmail isOpen={isOpen === 'contact'} {onClose} />

<ModalFacilities
	isOpen={isOpen === 'facilities'}
	onOpenJoin={() => (isOpen = 'prices')}
	{onClose}
/>
<ModalOpportunities isOpen={isOpen === 'opportunities'} {onClose} />
<ModalPrices isOpen={isOpen === 'prices'} {onClose} {onOpenContact} />
<ModalServices isOpen={isOpen === 'services'} {onClose} />

<div
	class="font-jersey bg-primary grid w-screen gap-4 overflow-hidden px-4 pt-4 md:min-h-screen md:place-items-center md:gap-0 md:px-6 md:pt-0"
>
	<div class="grid h-full min-h-30 place-items-center md:hidden">
		<div class="text-secondary w-20">
			<IconLogo />
		</div>
		<p class="text-secondary/50 text-xl">rent a creative space in amsterdam</p>
	</div>
	<div class="bg-primary w-full max-w-[1000px] rounded-lg border-4 border-black p-4">
		<div class="text-secondary grid gap-2 text-xl md:grid-cols-[1fr_1fr_4fr]">
			<div class="flex flex-row-reverse justify-between gap-2 md:flex-col-reverse">
				<button
					class="midi bg-highlight/20 text-secondary hover:bg-highlight active:bg-highlight active:text-secondary grid flex-grow place-items-center transition-all"
					onclick={() => (isOpen = 'prices')}
				>
					join
				</button>
				<div class="midi grid flex-grow place-items-center">about</div>

				<div
					class="shadow-flat translate-adjust hidden max-h-[300px] items-center justify-center rounded-lg border-2 border-black px-2 py-6 md:flex"
				>
					<MidiSlider />
				</div>

				<div class="text-secondary hidden md:flex">
					<SpeakerGrate />
				</div>
			</div>
			<div class="flex gap-2 md:flex-col">
				<button
					class="midi grid h-full flex-grow place-items-center"
					onclick={() => (isOpen = 'facilities')}
				>
					<p>facilities</p>
				</button>
				<button
					class="midi grid h-full flex-grow place-items-center"
					onclick={() => (isOpen = 'services')}
				>
					<p>services</p>
				</button>
				<button
					class="midi grid h-full flex-grow place-items-center"
					onclick={() => (isOpen = 'opportunities')}
				>
					<p>opportunities</p>
				</button>
			</div>
			<div class="flex flex-col gap-2">
				<MidiScreen />
				<Turntable />
			</div>
		</div>
	</div>
</div>
