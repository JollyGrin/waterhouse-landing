<script lang="ts">
	import Modal from './Modal.svelte';
	import { fade, fly } from 'svelte/transition';
	import Product from './pane/Product.svelte';
	import { PRICES } from '$lib/constants-price';
	let {
		isOpen = false,
		onClose,
		onOpenJoin
	}: { isOpen?: boolean; onClose(): void; onOpenJoin(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Ateliers">
		<div class="">
			<p class="font-jersey bg-secondary text-primary mb-8 inline-block w-full p-2 text-2xl">
				Offices for artist and industry professionals
			</p>

			<div class="grid gap-8 md:grid-cols-2">
				<Product
					title="Atelier"
					memo="For artist and industry professional, 24/7 access"
					info={[[], []]}
				/>

				<div
					class="text-primary bg-highlight shadow-flat hover:shadow-hover font-jersey grid place-items-center rounded-lg border-2 border-black transition-all hover:translate-y-1"
					in:fly={{ y: 20, duration: 300, delay: 300 }}
				>
					<div class="flex flex-col p-6 transition-all">
						<h2 class="text-2xl">Atelier (Office)</h2>
						<div class="flex items-center gap-2">
							<span class="text-6xl"> €{PRICES.OFFICE} </span>
							<div class="flex flex-col text-sm">
								<span class=""> /month </span>
								<!-- <span class=" opacity-50"> (not including utilities) </span> -->
							</div>
						</div>
						<div class="flex flex-wrap gap-2 tracking-tight text-white/80">
							<span>Meeting room access</span>
							<span>Business amenities</span>
							<span>Stream room access</span>
						</div>
					</div>

					<div
						class="flex justify-center pt-10 pb-4 md:mt-8"
						in:fade={{ duration: 400, delay: 450 }}
					>
						<button
							class="midi bg-highlight text-primary font-jersey hover:bg-highlight/90 flex items-center gap-2 px-8 py-2 text-2xl"
							onclick={onOpenJoin}
						>
							<span>join waiting list</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="m12 5 7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}

	:global(.shadow-hover) {
		box-shadow: 0px 0px 0 black;
	}

	:global(.translate-adjust) {
		transform: translate(4px, 4px);
	}

	:global(.translate-reset) {
		transform: translate(0px, 0px);
	}

	:global(.hover\:translate-y-1:hover) {
		transform: translateY(4px);
	}
</style>
