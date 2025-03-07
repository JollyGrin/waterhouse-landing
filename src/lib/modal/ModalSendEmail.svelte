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

	// Supabase Edge Function URL
	const EDGE_FUNCTION_URL =
		'https://vyjgzmwpqtuoucjgmxyf.supabase.co/functions/v1/signup-waterhouse';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!name || !email || !phone || !portfolio) {
			error = 'Please fill out all required fields';
			return;
		}

		submitting = true;
		error = '';

		try {
			const response = await fetch(EDGE_FUNCTION_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
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
			<p class="font-jersey text-highlight bg-secondary text-primary p-2 text-lg text-xl">
				Complete this form to reserve your studio space
			</p>

			{#if success}
				<div class="rounded-lg bg-green-800/20 p-4 text-center">
					<p class="font-jersey text-lg">Application submitted successfully!</p>
					<p class="font-jersey mt-2 text-sm">
						We'll contact you soon to confirm your reservation.
					</p>
				</div>
			{:else}
				<form class="space-y-4">
					{#if error}
						<div class="rounded-lg bg-red-800/20 p-4">
							<p class="font-jersey text-sm text-red-300">{error}</p>
						</div>
					{/if}

					<div class="">
						<label for="name" class="font-jersey text-highlight block">Full Name *</label>
						<input
							type="text"
							id="name"
							bind:value={name}
							class="bg-secondary/20 border-secondary/30 font-jersey w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class=" ">
						<label for="email" class="font-jersey text-highlight block">Email Address *</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="bg-secondary/20 border-secondary/30 font-jersey w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="">
						<label for="phone" class="font-jersey text-highlight block">Phone Number *</label>
						<input
							type="tel"
							id="phone"
							bind:value={phone}
							class="bg-secondary/20 border-secondary/30 font-jersey w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="">
						<label for="portfolio" class="font-jersey text-highlight block">Portfolio URL *</label>
						<input
							type="url"
							id="portfolio"
							bind:value={portfolio}
							placeholder="https://your-portfolio.com"
							class="bg-secondary/20 border-secondary/30 font-jersey w-full rounded-lg border p-2"
							disabled={submitting}
							required
						/>
					</div>

					<div class="">
						<label class="font-jersey block text-sm" for="studio">Studio Type</label>
						<select
							id="studio"
							bind:value={studio}
							class="bg-primary font-jersey w-full rounded-lg p-2 text-sm"
							disabled={submitting}
						>
							<option value="shared">Shared Studio</option>
							<option value="solo">Solo Studio</option>
							<option value="office">Atelier</option>
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
		color: var(--color-secondary);
		outline: none;
	}

	input:focus,
	textarea:focus {
		border-color: var(--color-highlight, #4fd1c5);
	}
</style>
