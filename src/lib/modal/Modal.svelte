<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	let {
		isOpen = false,
		onClose,
		title = '',
		children
	}: { isOpen?: boolean; onClose(): void; children?: any; title?: string } = $props();
</script>

{#snippet closeXButton()}
	<button
		aria-label="close modal"
		class="text-secondary rounded-full p-2 transition-colors hover:bg-black/10"
		onclick={onClose}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	</button>
{/snippet}

{#if isOpen}
	<div
		onkeydown={(e) => e.key === 'Enter'}
		tabindex="0"
		role="button"
		aria-label="close backdrop"
		class="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4 backdrop-blur-sm transition-all"
		id="backdrop"
		onclick={(e) => {
			e.preventDefault();
			if ((e?.target as HTMLElement)?.id === 'backdrop') onClose();
		}}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		<div
			class="shadow-flat bg-primary text-secondary flex max-h-[95vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-lg border-2 border-black p-6"
			in:scale={{ duration: 200, start: 0.95 }}
			out:scale={{ duration: 150, start: 1 }}
		>
			<div class="flex items-center justify-between">
				<h2 class="font-jersey text-8xl">{title}</h2>
				{@render closeXButton()}
			</div>

			{@render children()}
		</div>
	</div>
{/if}

<style>
	:global(.shadow-flat) {
		box-shadow: 4px 4px 0 black;
	}
</style>
