<script lang="ts">
	import { PRICES } from '$lib/constants-price';
	import Modal from './Modal.svelte';
	import { fade, fly } from 'svelte/transition';
	let {
		isOpen = false,
		onClose,
		onOpenJoin
	}: { isOpen?: boolean; onClose(): void; onOpenJoin(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Music Studios">
		<div class="">
			<p class="font-jersey bg-secondary text-primary mb-8 inline-block w-full p-2 text-2xl">
				Designed for optimal acoustics and workflow
			</p>

			<div class="grid gap-8 md:grid-cols-2">
				<div
					class="bg-primary shadow-flat hover:shadow-hover space-y-6 rounded-lg border-2 border-black p-6 transition-all hover:translate-y-1"
					in:fly={{ y: 20, duration: 300, delay: 150 }}
				>
					<div class="space-y-4">
						<div class="flex items-center gap-3">
							<div class="bg-secondary flex h-10 w-10 items-center justify-center rounded-full p-2">
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
									class="text-primary"
								>
									<path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" />
									<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
									<path d="M12 2v2" />
									<path d="M12 20v2" />
									<path d="m4.93 4.93 1.41 1.41" />
									<path d="m17.66 17.66 1.41 1.41" />
									<path d="M2 12h2" />
									<path d="M20 12h2" />
									<path d="m6.34 17.66-1.41 1.41" />
									<path d="m19.07 4.93-1.41 1.41" />
								</svg>
							</div>
							<h3 class="font-jersey text-2xl">Music Studios</h3>
						</div>
						<p class="font-jersey border-secondary border-l-4 pl-3 text-lg leading-relaxed">
							Our fully equipped music studios are designed for recording, mixing, and producing.
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-3">
							<h4
								class="font-jersey text-secondary border-secondary flex items-center gap-2 border-b-2 text-lg"
							>
								Recording
							</h4>
							<ul class="font-jersey text-md">
								<li class="flex items-center gap-2">Pro microphones</li>
								<li class="flex items-center gap-2">Acoustic treatment</li>
								<li class="flex items-center gap-2">Multiple rooms</li>
							</ul>
						</div>

						<div class="space-y-3">
							<h4
								class="font-jersey text-secondary border-secondary flex items-center gap-2 border-b-2 text-lg"
							>
								Production
							</h4>
							<ul class="font-jersey text-md">
								<li class="flex items-center gap-2">Mixing consoles</li>
								<li class="flex items-center gap-2">MIDI equipment</li>
								<li class="flex items-center gap-2">Monitor speakers</li>
							</ul>
						</div>
					</div>
				</div>

				<div
					class="text-primary bg-highlight shadow-flat hover:shadow-hover font-jersey flex flex-col justify-around rounded-lg border-2 border-black transition-all hover:translate-y-1"
					in:fly={{ y: 20, duration: 300, delay: 300 }}
				>
					<div class="flex h-full flex-col bg-white/10 p-6 transition-all hover:bg-white/5">
						<h2 class="text-2xl">Shared Studio</h2>
						<div class="flex items-center gap-2">
							<span class="text-6xl"> €{PRICES.SHARED} </span>
							<div class="flex flex-col text-sm">
								<span class=""> /month </span>
								<!-- <span class=" opacity-50"> (not including utilities) </span> -->
							</div>
						</div>
						<div class="flex flex-wrap gap-2 tracking-tight text-white/80">
							<span>80 hours per month</span>
							<span>Shared workspace</span>
							<span>Basic equipment</span>
							<span>Stream room access</span>
						</div>
					</div>

					<div class="flex h-full flex-col bg-white/10 p-6 transition-all hover:bg-white/5">
						<h2 class="text-2xl">Solo Studio</h2>
						<div class="flex items-center gap-2">
							<span class="text-6xl"> €{PRICES.SOLO} </span>
							<div class="flex flex-col text-sm">
								<span class=""> /month </span>
								<!-- <span class=" opacity-50"> (not including utilities) </span> -->
							</div>
						</div>
						<div class="flex flex-wrap gap-2 tracking-tight text-white/80">
							<span>24/7 private access</span>
							<span>Storage space</span>
							<span>Premium equipment</span>
							<span>Stream room access</span>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-8 flex justify-center" in:fade={{ duration: 400, delay: 450 }}>
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
