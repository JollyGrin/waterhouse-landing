<script lang="ts">
	import Modal from './Modal.svelte';

	let {
		isOpen = false,
		onClose,
		onOpenContact
	}: { isOpen?: boolean; onClose(): void; onOpenContact(): void } = $props();
</script>

{#snippet priceText(price: string)}
	<div class="flex flex-col items-start justify-center">
		<span class="font-ovo text-4xl font-bold">€{price}</span>
		<span class="text-secondary/30 font-ovo ml-1 text-xs">per month</span>
	</div>
{/snippet}

{#if isOpen}
	<Modal {isOpen} {onClose} title="Choose your plan">
		<p class="font-jersey text-highlight text-2xl">
			Simple subscriptions so you can focus on creativity.
		</p>
		<div class="space-y-8">
			<div class="grid gap-2 md:grid-cols-3">
				<!-- Shared Studio -->
				<div class="bg-secondary/20 space-y-6 rounded-lg p-6">
					<div class="space-y-2">
						<h3 class="font-ovo text-2xl">Shared Studio</h3>
						<p class="text-highlight font-ovo">Perfect for emerging artists</p>
					</div>

					{@render priceText('275')}

					<ul class="space-y-4 font-mono text-sm">
						<li class="flex items-center gap-2">80 hours per month</li>
						<li class="flex items-center gap-2">Shared workspace</li>
						<li class="flex items-center gap-2">Basic equipment included</li>
						<li class="flex items-center gap-2">Stream room access</li>
					</ul>

					<button
						class="w-full rounded border border-teal-700 px-4 py-2 font-mono text-sm transition-colors hover:bg-teal-900/30"
						onclick={onOpenContact}
					>
						Select Plan
					</button>
				</div>

				<!-- Solo Studio -->
				<div class="bg-highlight/20 space-y-6 rounded-lg p-6">
					<div class="space-y-2">
						<h3 class="font-ovo text-2xl">Solo Studio</h3>
						<p class="text-highlight font-ovo">Your private creative space</p>
					</div>

					{@render priceText('1,100')}

					<ul class="space-y-4 font-mono text-sm">
						<li class="flex items-center gap-2">24/7 private access</li>
						<li class="flex items-center gap-2">Premium equipment</li>
						<li class="flex items-center gap-2">Storage space</li>
						<li class="flex items-center gap-2">Stream room access</li>
					</ul>

					<button
						class="w-full rounded border border-teal-700 px-4 py-2 font-mono text-sm transition-colors hover:bg-teal-900/30"
						onclick={onOpenContact}
					>
						Select Plan
					</button>
				</div>

				<!-- Office Space -->
				<div class="bg-secondary/20 space-y-6 rounded-lg p-6">
					<div class="space-y-2">
						<h3 class="font-ovo text-2xl">Office Space</h3>
						<p class="text-highlight font-ovo">For industry professionals</p>
					</div>

					{@render priceText('500')}

					<ul class="space-y-4 font-mono text-sm">
						<li class="flex items-center gap-2">Dedicated desk</li>
						<li class="flex items-center gap-2">Meeting room access</li>
						<li class="flex items-center gap-2">Business amenities</li>
						<li class="flex items-center gap-2">Stream room access</li>
					</ul>

					<button
						class="w-full rounded border border-teal-700 px-4 py-2 font-mono text-sm transition-colors hover:bg-teal-900/30"
						onclick={onOpenContact}
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
