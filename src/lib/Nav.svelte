<script lang="ts">
	import MaskedLogoShader from './MaskedLogoShader.svelte';
	import { shaderConfigRainbow } from './shader/shaders';

	let {
		onOpenAbout,
		onOpenStudio,
		onOpenAtelier
	}: { onOpenAbout(): void; onOpenStudio(): void; onOpenAtelier(): void } = $props();
</script>

<div
	class="font-jersey relative z-10 container mx-auto hidden h-12 items-center justify-between px-4 text-xl md:mb-10 md:flex"
>
	<button class="w-16 transition-all hover:scale-110" onclick={onOpenAbout}>
		<!-- <MaskedLogoShader shader={shaderConfigRainbow} /> -->
		<img src="/logo.svg" width="100px" alt="logo" class="logo-legible" />
	</button>
	<div class="hero-legible-sm flex items-center gap-2">
		<button class="cursor-pointer transition-all hover:scale-110" onclick={onOpenStudio}
			>rent a studio</button
		>
		<span>|</span>
		<button class="cursor-pointer transition-all hover:scale-110" onclick={onOpenAtelier}
			>rent an atelier</button
		>
		<span>|</span>
		<a
			href="https://app.waterhousestudios.nl"
			class="cursor-pointer text-sm opacity-40 transition-all hover:opacity-100">login</a
		>
	</div>
</div>

<style>
	/* Paper halo so the solid-black logo reads cleanly where a cable crosses it.
	   text-shadow can't touch an <img>, so use a drop-shadow filter on the shape. */
	.logo-legible {
		filter: drop-shadow(0 0 3px var(--color-primary)) drop-shadow(0 0 3px var(--color-primary))
			drop-shadow(0 0 5px var(--color-primary));
	}
</style>
