<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose}>
		<div class="space-y-8">
			<h2 class="text-4xl">Choose your plan</h2>

			<div class="grid gap-6 md:grid-cols-3">
				<!-- Shared Studio -->
				<div class="space-y-6 rounded-lg border border-teal-700 bg-black/20 p-6">
					<div class="space-y-2">
						<h3 class="text-2xl">Shared Studio</h3>
						<p class="font-mono text-sm text-teal-400">Perfect for emerging artists</p>
					</div>

					<div class="space-y-1">
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold">€275</span>
							<span class="font-mono text-sm text-teal-400">/month</span>
						</div>
					</div>

					<ul class="space-y-4 font-mono text-sm">
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							80 hours per month
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Shared workspace
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Basic equipment included
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Stream room access
						</li>
					</ul>

					<button
						class="w-full rounded border border-teal-700 px-4 py-2 font-mono text-sm transition-colors hover:bg-teal-900/30"
					>
						Select Plan
					</button>
				</div>

				<!-- Solo Studio -->
				<div class="space-y-6 rounded-lg border border-teal-700 bg-black/20 p-6">
					<div class="space-y-2">
						<h3 class="text-2xl">Solo Studio</h3>
						<p class="font-mono text-sm text-teal-400">Your private creative space</p>
					</div>

					<div class="space-y-1">
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold">€1,100</span>
							<span class="font-mono text-sm text-teal-400">/month</span>
						</div>
					</div>

					<ul class="space-y-4 font-mono text-sm">
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							24/7 private access
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Premium equipment
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Storage space
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Stream room access
						</li>
					</ul>

					<button
						class="w-full rounded border border-teal-700 px-4 py-2 font-mono text-sm transition-colors hover:bg-teal-900/30"
					>
						Select Plan
					</button>
				</div>

				<!-- Office Space -->
				<div class="space-y-6 rounded-lg border border-teal-700 bg-black/20 p-6">
					<div class="space-y-2">
						<h3 class="text-2xl">Office Space</h3>
						<p class="font-mono text-sm text-teal-400">For industry professionals</p>
					</div>

					<div class="space-y-1">
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold">€500</span>
							<span class="font-mono text-sm text-teal-400">/month</span>
						</div>
					</div>

					<ul class="space-y-4 font-mono text-sm">
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Dedicated desk
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Meeting room access
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Business amenities
						</li>
						<li class="flex items-center gap-2">
							<span class="text-teal-400">•</span>
							Stream room access
						</li>
					</ul>

					<button
						class="w-full rounded border border-teal-700 px-4 py-2 font-mono text-sm transition-colors hover:bg-teal-900/30"
					>
						Select Plan
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
</style>
