<script lang="ts">
	import IconLogo from '$lib/icon/IconLogo.svelte';
	import MidiScreen from '$lib/MidiScreen.svelte';
	import MidiSlider from '$lib/MidiSlider.svelte';
	import ModalFacilities from '$lib/modal/ModalFacilities.svelte';
	import ModalMusicStudio from '$lib/modal/ModalMusicStudio.svelte';
	import ModalOffice from '$lib/modal/ModalOffice.svelte';
	import ModalOpportunities from '$lib/modal/ModalOpportunities.svelte';
	import ModalPrices from '$lib/modal/ModalPrices.svelte';
	import ModalSendEmail from '$lib/modal/ModalSendEmail.svelte';
	import ModalServices from '$lib/modal/ModalServices.svelte';
	import ModalStream from '$lib/modal/ModalStream.svelte';
	import SpeakerGrate from '$lib/SpeakerGrate.svelte';
	import Turntable from '$lib/Turntable.svelte';

	type ModalKey =
		| 'contact'
		| 'facilities'
		| 'services'
		| 'opportunities'
		| 'prices'
		| 'music'
		| 'stream'
		| 'office';
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

<ModalMusicStudio isOpen={isOpen === 'music'} onOpenJoin={() => (isOpen = 'contact')} {onClose} />
<ModalStream isOpen={isOpen === 'stream'} onOpenJoin={() => (isOpen = 'contact')} {onClose} />
<ModalOffice isOpen={isOpen === 'office'} onOpenJoin={() => (isOpen = 'contact')} {onClose} />
<ModalOpportunities isOpen={isOpen === 'opportunities'} {onClose} />
<ModalPrices isOpen={isOpen === 'prices'} {onClose} {onOpenContact} />
<ModalServices isOpen={isOpen === 'services'} {onClose} />

<div class="font-jersey bg-primary min-h-screen overflow-hidden p-8">
	<div class="mx-auto max-w-[1000px] space-y-8">
		<!-- Title Section -->
		<div class="text-secondary hidden flex-col items-center text-center md:flex">
			<IconLogo w={100} />
			<p class="text-6xl">Waterhouse Studios</p>
		</div>

		<!-- Main Content -->
		<div class="bg-secondary/5 rounded-lg border-4 border-black p-6">
			<div class="pb-6">
				<MidiScreen />
			</div>
			<div class="grid gap-4">
				<!-- Top Row: Studio Types -->
				<div
					class="grid grid-cols-1 grid-rows-[50px_50px_50px] gap-4 md:grid-cols-3 md:grid-rows-[100px]"
				>
					<button
						class="midi bg-primary text-secondary grid place-items-center text-3xl"
						onclick={() => (isOpen = 'music')}
					>
						<p>Music Studio</p>
					</button>
					<button
						class="midi bg-primary text-secondary grid place-items-center text-3xl"
						onclick={() => (isOpen = 'stream')}
					>
						<p>Stream Studio</p>
					</button>
					<button
						class="midi bg-primary text-secondary grid place-items-center text-3xl"
						onclick={() => (isOpen = 'office')}
					>
						<p>Atelier Studio</p>
					</button>
				</div>

				<!-- Bottom Row: Actions -->
				<div
					class="grid grid-cols-1 grid-rows-[50px_50px_50px] gap-4 md:grid-cols-3 md:grid-rows-[100px]"
				>
					<button
						onclick={() => (isOpen = 'opportunities')}
						class="midi bg-primary text-secondary grid place-items-center text-3xl"
					>
						<p>Opportunities</p>
					</button>
					<button
						class="midi bg-primary text-secondary grid place-items-center text-3xl"
						onclick={() => (isOpen = 'services')}
					>
						<p>Service</p>
					</button>
					<button
						class="midi bg-highlight/20 text-secondary hover:bg-highlight active:bg-highlight active:text-secondary grid place-items-center text-3xl transition-all"
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
