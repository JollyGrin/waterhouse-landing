<script lang="ts">
	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();

	// Form data
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitting = $state(false);
	let success = $state(false);
	let error = $state('');

	// Supabase URL - replace with your actual Supabase URL and function endpoint
	const SUPABASE_URL = 'https://your-supabase-project.supabase.co/functions/v1/send-email';

	async function handleSubmit() {
		if (!name || !email || !message) {
			error = 'Please fill out all fields';
			return;
		}

		submitting = true;
		error = '';

		try {
			const response = await fetch(SUPABASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					message
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to send message');
			}

			// Reset form and show success message
			name = '';
			email = '';
			message = '';
			success = true;

			// Auto-close after success (optional)
			setTimeout(() => {
				if (success) onClose();
			}, 3000);
		} catch (err) {
			console.error('Error sending message:', err);
			error = err instanceof Error ? err.message : 'Failed to send message';
		} finally {
			submitting = false;
		}
	}
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Contact Us">
		<div class="space-y-6">
			<p class="font-jersey text-highlight text-lg">
				Send us a message and we'll get back to you soon
			</p>

			{#if success}
				<div class="rounded-lg bg-green-800/20 p-4 text-center">
					<p class="font-ovo text-lg">Message sent successfully!</p>
					<p class="font-ovo mt-2 text-sm">We'll get back to you soon.</p>
				</div>
			{:else}
				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
					{#if error}
						<div class="rounded-lg bg-red-800/20 p-4">
							<p class="font-ovo text-sm text-red-300">{error}</p>
						</div>
					{/if}

					<div class="space-y-2">
						<label for="name" class="font-jersey text-highlight block">Name</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
						/>
					</div>

					<div class="space-y-2">
						<label for="email" class="font-jersey text-highlight block">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
						/>
					</div>

					<div class="space-y-2">
						<label for="message" class="font-jersey text-highlight block">Message</label>
						<textarea
							id="message"
							bind:value={message}
							rows="4"
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
						></textarea>
					</div>

					<button
						type="submit"
						class="midi bg-highlight text-primary font-jersey w-full px-4 py-2 text-xl"
						disabled={submitting}
					>
						{#if submitting}
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</Modal>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}

	input,
	textarea {
		color: white;
		outline: none;
	}

	input:focus,
	textarea:focus {
		border-color: var(--color-highlight, #4fd1c5);
	}
</style>
