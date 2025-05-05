<script lang="ts">
	import Modal from './Modal.svelte';
	import { fly } from 'svelte/transition';
	import Product from './pane/Product.svelte';
	import { PRICES } from '$lib/constants-price';
	let {
		isOpen = false,
		onClose,
		onOpenJoin
	}: { isOpen?: boolean; onClose(): void; onOpenJoin(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Stream Room">
		<div class="">
			<p class="font-jersey bg-secondary text-primary mb-8 inline-block w-full p-2 text-2xl">
				Host professional video-streams and create content.
			</p>

			<div class="grid gap-8 md:grid-cols-2">
				<Product
					title="Stream Room"
					memo="Ready for Twitch and YouTube broadcasts, perfect for building your online presence."
					info={[
						['Stream Setup', '4K cameras', 'Pro lighting', 'Green screen', 'Stream deck'],
						['Audio/Visual', 'Audio interface', 'Multiple mics', 'Monitor setup', 'Sound treatment']
					]}
				/>

				<div
					class="text-primary bg-highlight shadow-flat hover:shadow-hover font-jersey flex flex-col rounded-lg border-2 border-black transition-all hover:translate-y-1"
					in:fly={{ y: 20, duration: 300, delay: 300 }}
				>
					<div
						class="flex flex-col gap-1 border-b-2 border-dotted px-2 transition-all hover:bg-white/5"
					>
						<h2 class="text-2xl">Shared Studio</h2>
						<div class="flex items-center gap-2">
							<span class="text-4xl"> €{PRICES.SHARED} </span>
							<div class="flex flex-col text-sm">
								<span class=""> /month </span>
								<span class=" opacity-50"> (not including utilities) </span>
							</div>
						</div>
					</div>

					<div class=" flex flex-col border-b-2 border-dotted px-2 transition-all hover:bg-white/5">
						<h2 class="text-2xl">Atelier</h2>
						<div class="flex items-center gap-2">
							<span class="text-4xl"> €{PRICES.OFFICE} </span>
							<div class="flex flex-col text-sm">
								<span class=""> /month </span>
								<span class=" opacity-50"> (not including utilities) </span>
							</div>
						</div>
					</div>
					<div class="flex flex-col px-2 transition-all hover:bg-white/5">
						<h2 class="text-2xl">Solo Studio</h2>
						<div class="flex items-center gap-2">
							<span class="text-4xl"> €{PRICES.SOLO} </span>
							<div class="flex flex-col text-sm">
								<span class=""> /month </span>
								<span class=" opacity-50"> (not including utilities) </span>
							</div>
						</div>
					</div>

					<div class="grid h-full place-items-center pt-10 pb-4 md:p-0">
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
