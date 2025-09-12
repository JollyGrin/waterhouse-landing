<script lang="ts">
	import Nav from '$lib/Nav.svelte';

	function downloadAsset(filename: string) {
		const link = document.createElement('a');
		link.href = `/${filename}`;
		link.download = filename;
		link.click();
	}
</script>

<svelte:head>
	<title>Media Kit - Waterhouse Studios</title>
	<meta
		name="description"
		content="Download Waterhouse Studios brand assets including logos, fonts, and media resources."
	/>
</svelte:head>

<main class="flex min-h-screen flex-col bg-black px-4 py-20 text-white">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-2 text-center text-4xl font-bold md:text-6xl">Media Kit</h1>
		<p class="mb-12 text-center text-gray-400">
			Download our brand assets for press and promotional use
		</p>

		<section class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold">Brand Assets</h2>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Logo Section -->
				<div class="rounded-lg bg-zinc-900 p-8">
					<h3 class="mb-4 text-xl font-semibold">Logo</h3>
					<div class="mb-6 flex min-h-[200px] items-center justify-center rounded-lg bg-white p-8">
						<img
							src="/logo.svg"
							alt="Waterhouse Studios Logo"
							class="h-auto w-full max-w-[200px]"
						/>
					</div>
					<button
						onclick={() => downloadAsset('logo.svg')}
						class="w-full rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200"
					>
						Download SVG
					</button>
				</div>

				<!-- Banner Section -->
				<div class="rounded-lg bg-zinc-900 p-8">
					<h3 class="mb-4 text-xl font-semibold">Banner</h3>
					<div class="mb-6 flex min-h-[200px] items-center justify-center rounded-lg bg-black p-4">
						<img
							src="/banner.jpg"
							alt="Waterhouse Studios Banner"
							class="h-auto w-full rounded object-cover"
						/>
					</div>
					<button
						onclick={() => downloadAsset('banner.jpg')}
						class="w-full rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200"
					>
						Download JPG
					</button>
				</div>
			</div>
		</section>

		<section class="flex flex-col gap-2">
			<h2 class=" text-2xl font-semibold">Typography</h2>

			<div class="rounded-lg bg-zinc-900 p-8">
				<h3 class=" text-xl font-semibold">Jersey 10 Font</h3>
				<p class=" text-gray-400">
					Our brand uses the Jersey 10 font family for headlines and display text.
				</p>
				<div class=" rounded-lg bg-black p-8">
					<p class=" text-4xl font-bold" style="font-family: 'Jersey 10', sans-serif;">
						Waterhouse Studios
					</p>
					<p class="text-xl" style="font-family: 'Jersey 10', sans-serif;">
						The quick brown fox jumps over the lazy dog
					</p>
				</div>
				<a
					href="https://fonts.google.com/specimen/Jersey+10"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200"
				>
					View on Google Fonts
				</a>
			</div>
		</section>
	</div>
	<div class="h-10"></div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');
</style>

