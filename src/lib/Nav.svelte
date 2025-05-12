<script lang="ts">
	import MaskedLogoShader from './MaskedLogoShader.svelte';
	import { shaderConfigRainbow } from './shader/shaders';

	let { onOpenStudio, onOpenAtelier }: { onOpenStudio(): void; onOpenAtelier(): void } = $props();
</script>

<div
	class="font-jersey container mx-auto hidden h-12 items-center justify-between text-xl md:mb-10 md:flex"
>
	<div class="w-16 transition-all hover:scale-110">
		<MaskedLogoShader shader={shaderConfigRainbow} />
	</div>
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
