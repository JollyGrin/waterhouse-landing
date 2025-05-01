<script lang="ts">
	import IconBattery from './icon/IconBattery.svelte';
	import IconLogo from './icon/IconLogo.svelte';
	import IconNetwork from './icon/IconNetwork.svelte';
	import MaskedLogoShader from './MaskedLogoShader.svelte';
	import { shaderConfigOrganicRainbow } from './shader/shaders';
</script>

<div
	class="font-jersey border-secondary text-highlight bg-primary relative m-[-8px] grid min-h-[220px] place-items-center rounded border-4 p-2 text-4xl md:text-6xl"
>
	<div class="absolute top-2 left-2 w-6 animate-pulse">
		<IconBattery />
	</div>
	<div class="absolute top-2 right-2 w-6">
		<IconNetwork />
	</div>

	<div class="absolute bottom-0 left-2 hidden md:flex">
		<!-- <span class="animate-pulse text-xs tracking-wide select-none"> -->
		<!-- 	creative spaces in amsterdam -->
		<!-- </span> -->
	</div>
	<div class="text-secondary absolute top-2 md:hidden">
		<MaskedLogoShader width="10rem" height="7rem" shader={shaderConfigOrganicRainbow} outline />
	</div>

	<div class="hidden flex-col items-center md:flex">
		<p class="text-8xl">RENT</p>
		<p class="text-secondary md:text-md text-[2rem]">a creative space in Amsterdam</p>
	</div>
	<p class="text-secondary md:text-md translate-y-[2rem] text-[2rem] md:hidden">
		Waterhouse Studios
	</p>
</div>

<style>
	.screen {
		-webkit-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		-moz-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
	}
</style>
