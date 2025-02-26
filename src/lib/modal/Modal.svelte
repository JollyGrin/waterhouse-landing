<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4 backdrop-blur-sm transition-all"
		onclick={onClose}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		<div
			class="shadow-flat w-full max-w-2xl rounded-lg border-2 border-black bg-teal-800 p-6 text-teal-100"
			in:scale={{ duration: 200, start: 0.95 }}
			out:scale={{ duration: 150, start: 1 }}
		>
			<div class="flex items-start justify-between">
				<h2 class="text-2xl font-bold">Studio Facilities</h2>
				<button
					class="rounded-full p-2 text-teal-100 transition-colors hover:bg-black/10"
					onclick={onClose}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			</div>

			<div class="mt-6 grid gap-6 md:grid-cols-2">
				<div class="space-y-4">
					<h3 class="text-xl font-bold">Recording Studios</h3>
					<ul class="list-inside list-disc space-y-2">
						<li>Professional acoustic treatment</li>
						<li>Vintage and modern microphones</li>
						<li>High-end preamps and interfaces</li>
						<li>Multiple isolation booths</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Control Rooms</h3>
					<ul class="list-inside list-disc space-y-2">
						<li>Analog mixing consoles</li>
						<li>Pro Tools HD systems</li>
						<li>Extensive outboard gear</li>
						<li>Reference monitors</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Live Room</h3>
					<ul class="list-inside list-disc space-y-2">
						<li>Grand piano</li>
						<li>Drum kit setup</li>
						<li>Guitar and bass amplifiers</li>
						<li>Variable acoustics</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h3 class="text-xl font-bold">Amenities</h3>
					<ul class="list-inside list-disc space-y-2">
						<li>Lounge area</li>
						<li>Kitchen facilities</li>
						<li>24/7 access</li>
						<li>Secure equipment storage</li>
					</ul>
				</div>
			</div>

			<div class="mt-8 text-center">
				<button
					class="shadow-flat rounded-lg border-2 border-black bg-teal-700 px-6 py-2 text-lg transition-colors hover:bg-teal-600"
					onclick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
