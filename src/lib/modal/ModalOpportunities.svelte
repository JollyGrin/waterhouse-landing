<script lang="ts">
	import Modal from './Modal.svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();
</script>

{#if isOpen}
	<Modal {isOpen} {onClose}>TODO: add opportunities content</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
