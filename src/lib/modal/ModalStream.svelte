<script lang="ts">
	import Modal from './Modal.svelte';
	import { fly } from 'svelte/transition';
	import Product from './pane/Product.svelte';
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
					memo="Host live Twitch broadcasts with a full DJ rig — your audience sees the show and shapes it in real time."
					info={[
						['Stream Setup', 'Twitch broadcast', 'HD camera', 'Audio reactive lights', 'Live chat projector'],
						['Audio/Visual', '2x CDJs + mixer', 'Festival speakers', 'Studio monitors', 'Broadcast mic']
					]}
				/>

				<div
					class="text-primary bg-highlight shadow-flat hover:shadow-hover font-jersey flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-black p-6 transition-all hover:translate-y-1"
					in:fly={{ y: 20, duration: 300, delay: 300 }}
				>
					<div class="flex flex-col items-center gap-2 text-center">
						<p class="text-3xl">Included for Residents</p>
						<p class="text-lg opacity-75">
							All studio and atelier tenants get access to the stream room as part of their membership.
						</p>
					</div>

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
