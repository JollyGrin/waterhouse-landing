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
	class="font-jersey container mx-auto hidden h-12 items-center justify-between px-4 text-xl md:mb-10 md:flex"
>
	<button class="w-16 transition-all hover:scale-110" onclick={onOpenAbout}>
		<!-- <MaskedLogoShader shader={shaderConfigRainbow} /> -->
		<img src="/logo.svg" width="100px" alt="logo" />
	</button>
	<div class="flex items-center gap-2">
		<button class="cursor-pointer transition-all hover:scale-110" onclick={onOpenStudio}
			>rent a studio</button
		>
		<span>|</span>
		<button class="cursor-pointer transition-all hover:scale-110" onclick={onOpenAtelier}
			>rent an atelier</button
		>
	</div>
</div>
