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
		<span class="font-jersey text-6xl">€{price}</span>
		<span class="text-secondary/30 font-jersey ml-1 text-xs"
			>per month <br />(not including utilities)</span
		>
	</div>
{/snippet}

{#snippet pane(title: string, desc: string, price: string, features: string[])}
	<div
		class="bg-secondary/10 hover:bg-secondary/5 border-secondary flex flex-col justify-between rounded-lg border-4 p-6 transition-all"
	>
		<div class="flex flex-col gap-4">
			<div class="">
				<h3 class="font-jersey text-2xl">{title}</h3>
				<p class="text-highlight font-jersey">{desc}</p>
			</div>

			{@render priceText(price)}

			<ul class="text-md font-jersey space-y-2">
				{#each features as feature}
					<li class=" flex items-center gap-2">{feature}</li>
				{/each}
			</ul>
		</div>

		<button class="midi bg-highlight font-jersey text-primary mt-4 text-xl" onclick={onOpenContact}>
			Select Plan
		</button>
	</div>
{/snippet}

{#if isOpen}
	<Modal {isOpen} {onClose} title="Choose your plan">
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
					'Storage space',
					'Premium equipment',
					'Stream room access'
				])}

				<!-- Office Space -->
				{@render pane('Atelier', 'For artist & industry professionals', '450', [
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
