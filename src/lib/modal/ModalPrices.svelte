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
		<span class="text-secondary/30 font-ovo ml-1 text-xs"
			>per month <br />(not including utilities)</span
		>
	</div>
{/snippet}

{#snippet pane(title: string, desc: string, price: string, features: string[])}
	<div class="bg-secondary/20 flex flex-col justify-between rounded-lg p-6">
		<div class="flex flex-col gap-4">
			<div class="">
				<h3 class="font-ovo text-2xl">{title}</h3>
				<p class="text-highlight font-ovo">{desc}</p>
			</div>

			{@render priceText(price)}

			<ul class="text-md font-ovo space-y-2">
				{#each features as feature}
					<li class=" flex items-center gap-2">{feature}</li>
				{/each}
			</ul>
		</div>

		<button
			class="font-ovo text-md border-secondary hover:bg-secondary/30 hover:text-highlight mt-8 w-full rounded border px-4 py-2 transition-colors"
			onclick={onOpenContact}
		>
			Select Plan
		</button>
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
				{@render pane('Shared Studio', 'Perfect for emerging artists', '250', [
					'80 hours per month',
					'Shared workspace',
					'Basic equipment',
					'Stream room access'
				])}

				<!-- Solo Studio -->
				{@render pane('Solo Studio', 'Your private creative space', '900', [
					'24/7 private access',
					'Premium equipment',
					'Storage space',
					'Stream room access'
				])}

				<!-- Office Space -->
				{@render pane('Office Space', 'For industry professionals', '450', [
					'Dedicated desk',
					'Meeting room access',
					'Business amenities',
					'Stream room access'
				])}
			</div>
		</div>
	</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
