<script lang="ts" context="module">
	import { fade, scale } from 'svelte/transition';
</script>

<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose}>
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
	</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
