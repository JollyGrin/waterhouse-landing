<script lang="ts">
	import Modal from './Modal.svelte';
	import { fade, fly } from 'svelte/transition';
	let {
		isOpen = false,
		onClose,
		onOpenJoin
	}: { isOpen?: boolean; onClose(): void; onOpenJoin(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="State-of-the-Art Facilities">
		<div class="space-y-6">
			<p class="font-jersey bg-secondary text-primary inline-block p-2 text-2xl">
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
							<ul class="font-jersey text-md space-y-2">
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
							<ul class="font-jersey text-md space-y-2">
								<li class="flex items-center gap-2">Mixing consoles</li>
								<li class="flex items-center gap-2">MIDI equipment</li>
								<li class="flex items-center gap-2">Monitor speakers</li>
							</ul>
						</div>
					</div>
				</div>

				<div
					class="bg-primary shadow-flat hover:shadow-hover space-y-6 rounded-lg border-2 border-black p-6 transition-all hover:translate-y-1"
					in:fly={{ y: 20, duration: 300, delay: 300 }}
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
									<rect width="18" height="12" x="3" y="6" rx="2" />
									<path d="M10 12h4" />
									<path d="M12 10v4" />
									<path d="M3 10h18" />
								</svg>
							</div>
							<h3 class="font-jersey text-2xl">Stream Room</h3>
						</div>
						<p class="font-jersey border-secondary border-l-4 pl-3 text-lg leading-relaxed">
							Ready for Twitch and YouTube broadcasts, perfect for building your online presence.
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-3">
							<h4
								class="font-jersey text-secondary border-secondary flex items-center gap-2 border-b-2 text-lg"
							>
								Stream Setup
							</h4>
							<ul class="font-jersey text-md space-y-2">
								<li class="flex items-center gap-2">4K cameras</li>
								<li class="flex items-center gap-2">Pro lighting</li>
								<li class="flex items-center gap-2">Green screen</li>
								<li class="flex items-center gap-2">Stream deck</li>
							</ul>
						</div>

						<div class="space-y-3">
							<h4
								class="font-jersey text-secondary border-secondary flex items-center gap-2 border-b-2 text-lg"
							>
								Audio/Visual
							</h4>
							<ul class="font-jersey text-md space-y-2">
								<li class="flex items-center gap-2">Audio interface</li>
								<li class="flex items-center gap-2">Multiple mics</li>
								<li class="flex items-center gap-2">Monitor setup</li>
								<li class="flex items-center gap-2">Sound treatment</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-8 flex justify-center" in:fade={{ duration: 400, delay: 450 }}>
				<button
					class="midi bg-highlight text-primary font-jersey hover:bg-highlight/90 flex items-center gap-2 px-8 py-2 text-2xl"
					onclick={onOpenJoin}
				>
					<span>View Plans</span>
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
