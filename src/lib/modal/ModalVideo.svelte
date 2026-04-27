<script lang="ts">
	import { fade } from 'svelte/transition';

	let {
		isOpen = false,
		onClose,
		videoSrc = '',
		youtubeId = '',
		title = 'Tour'
	}: {
		isOpen?: boolean;
		onClose(): void;
		videoSrc?: string;
		youtubeId?: string;
		title?: string;
	} = $props();
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 grid place-items-center bg-black/90 backdrop-blur-sm"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
		tabindex="0"
		role="button"
		aria-label="close video"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		<div class="relative flex items-center justify-center h-full">
			<button
				aria-label="close video"
				class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
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
			{#if youtubeId}
				<iframe
					src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
					{title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
					referrerpolicy="strict-origin-when-cross-origin"
					class="rounded-lg shadow-2xl aspect-[9/16] h-[90vh] max-h-[90vh] max-w-full"
					onclick={(e) => e.stopPropagation()}
				></iframe>
			{:else}
				<video
					src={videoSrc}
					controls
					autoplay
					class="rounded-lg shadow-2xl max-h-[90vh] max-w-full object-contain"
					onclick={(e) => e.stopPropagation()}
				>
					<track kind="captions" />
					Your browser does not support the video tag.
				</video>
			{/if}
		</div>
	</div>
{/if}

