<script lang="ts">
	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';

	let { isOpen = false, onClose }: { isOpen?: boolean; onClose(): void } = $props();

	// Form data
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let portfolio = $state('');
	let studio = $state('shared'); // Default to shared studio
	let submitting = $state(false);
	let success = $state(false);
	let error = $state('');

	// Supabase URL and auth token
	const SUPABASE_URL = 'https://vyjgzmwpqtuoucjgmxyf.supabase.co/functions/v1/signup-waterhouse';
	const SUPABASE_AUTH_TOKEN =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5amd6bXdwcXR1b3VjamdteHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTIwMjU3OSwiZXhwIjoyMDU0Nzc4NTc5fQ.jcpzjIzAdq_-fW3jfkCevs2YCbs65EBlzO9qQV9gN-E';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		console.log('hi');
		if (!name || !email || !phone || !portfolio) {
			error = 'Please fill out all required fields';
			return;
		}

		submitting = true;
		error = '';

		try {
			const response = await fetch(SUPABASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${SUPABASE_AUTH_TOKEN}`
				},
				body: JSON.stringify({
					name,
					email,
					phone,
					portfolio,
					studio
				})
			});

			let data;
			try {
				data = await response.json();
			} catch (e) {
				// Handle case where response might not be JSON
				console.log('Response may not be JSON:', e);
			}

			if (!response.ok) {
				throw new Error(data?.error || `Failed to submit (${response.status})`);
			}

			// Reset form and show success message
			name = '';
			email = '';
			phone = '';
			portfolio = '';
			studio = 'shared';
			success = true;

			// Auto-close after success (optional)
			setTimeout(() => {
				if (success) onClose();
			}, 3000);
		} catch (err) {
			console.error('Error submitting form:', err);
			error = err instanceof Error ? err.message : 'Failed to submit form';
		} finally {
			submitting = false;
		}
	}
</script>

{#if isOpen}
	<Modal {isOpen} {onClose} title="Sign Up for Studio Space">
		<div class="space-y-6">
			<p class="font-jersey text-highlight text-lg">
				Complete this form to reserve your studio space
			</p>

			{#if success}
				<div class="rounded-lg bg-green-800/20 p-4 text-center">
					<p class="font-ovo text-lg">Application submitted successfully!</p>
					<p class="font-ovo mt-2 text-sm">We'll contact you soon to confirm your reservation.</p>
				</div>
			{:else}
				<form class="space-y-4">
					{#if error}
						<div class="rounded-lg bg-red-800/20 p-4">
							<p class="font-ovo text-sm text-red-300">{error}</p>
						</div>
					{/if}

					<div class="space-y-2">
						<label for="name" class="font-jersey text-highlight block">Full Name *</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="email" class="font-jersey text-highlight block">Email Address *</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="phone" class="font-jersey text-highlight block">Phone Number *</label>
						<input
							type="tel"
							id="phone"
							bind:value={phone}
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="portfolio" class="font-jersey text-highlight block">Portfolio URL *</label>
						<input
							type="url"
							id="portfolio"
							bind:value={portfolio}
							placeholder="https://your-portfolio.com"
							class="bg-secondary/20 border-secondary/30 font-ovo w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="space-y-2">
						<label class="font-ovo block text-sm" for="studio">Studio Type</label>
						<select
							id="studio"
							bind:value={studio}
							class="bg-primary font-ovo w-full rounded-lg p-2 text-sm"
							disabled={submitting}
						>
							<option value="shared">Shared Studio</option>
							<option value="solo">Solo Studio</option>
							<option value="office">Office Space</option>
						</select>
					</div>

					<button
						type="submit"
						class="midi bg-highlight text-primary font-jersey w-full px-4 py-2 text-xl"
						disabled={submitting}
						onclick={handleSubmit}
					>
						{#if submitting}
							Submitting...
						{:else}
							Submit Application
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
