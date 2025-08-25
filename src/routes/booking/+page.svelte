<script lang="ts">
	import ModalSendEmail from '$lib/modal/ModalSendEmail.svelte';
	import { onMount } from 'svelte';

	let isModalOpen = $state(true);

	function handleClose() {
		isModalOpen = false;
		// Optionally redirect to home page after closing
		// window.location.href = '/';
	}
</script>

<div class="bg-primary flex min-h-screen items-center justify-center">
	<div class="text-center">
		<h1 class="font-jersey text-secondary mb-4 text-4xl">Book Your Studio Space</h1>
		<p class="font-jersey text-secondary mb-8 text-xl">
			Complete the form to reserve your spot at Waterhouse Studios
		</p>

		{#if !isModalOpen}
			<button
				onclick={() => (isModalOpen = true)}
				class="font-jersey bg-highlight text-primary midi px-6 py-3 text-xl"
			>
				Open Booking Form
			</button>
		{/if}

		<a href="/">
			<button class="font-jersey bg-highlight/50 text-primary midi px-6 py-3 text-xl">
				Back to Home
			</button>
		</a>
	</div>

	<ModalSendEmail isOpen={isModalOpen} onClose={handleClose} />
</div>

<style>
	:global(body) {
		background-color: var(--color-primary);
	}

	.midi {
		box-shadow: 4px 4px 0 black;
	}

	.midi:active {
		box-shadow: 2px 2px 0 black;
		transform: translate(2px, 2px);
	}
</style>

