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

<div class="font-jersey bg-primary min-h-screen w-screen overflow-hidden p-8">
	<div class="mx-auto max-w-[1000px] space-y-8">
		<!-- Title Section -->
		<div class="text-secondary text-center">
			<h1 class="text-6xl font-bold">RENT</h1>
			<p class="text-2xl">A PROFESSIONAL SPACE IN AMSTERDAM</p>
		</div>

		<!-- Main Content -->
		<div class="bg-secondary/5 rounded-lg border-4 border-black p-6">
			<div class="pb-6">
				<MidiScreen />
			</div>
			<div class="grid gap-6">
				<!-- Top Row: Studio Types -->
				<div class="grid grid-cols-3 gap-4">
					<button
						class="midi bg-primary text-secondary grid aspect-square place-items-center text-xl"
						onclick={() => (isOpen = 'facilities')}
					>
						<p>Music Studio</p>
					</button>
					<button
						class="midi bg-primary text-secondary grid aspect-square place-items-center text-xl"
						onclick={() => (isOpen = 'services')}
					>
						<p>Stream Studio</p>
					</button>
					<button
						class="midi bg-primary text-secondary grid aspect-square place-items-center text-xl"
						onclick={() => (isOpen = 'opportunities')}
					>
						<p>Atelier Studio</p>
					</button>
				</div>

				<!-- Bottom Row: Actions -->
				<div class="grid grid-cols-3 gap-4">
					<div class="midi bg-primary text-secondary grid aspect-square place-items-center text-xl">
						<p>About</p>
					</div>
					<button
						class="midi bg-primary text-secondary grid aspect-square place-items-center text-xl"
						onclick={() => (isOpen = 'services')}
					>
						<p>Service</p>
					</button>
					<button
						class="midi bg-highlight/20 text-secondary hover:bg-highlight active:bg-highlight active:text-secondary grid aspect-square place-items-center text-xl transition-all"
						onclick={() => (isOpen = 'prices')}
					>
						<p>Join</p>
					</button>
				</div>

				<!-- MidiScreen and Turntable -->
				<!-- <div class="grid grid-cols-2 gap-4"> -->
				<!-- </div> -->
			</div>

			<Turntable />
		</div>
	</div>
</div>
