<script lang="ts">
	import IconBattery from './icon/IconBattery.svelte';
	import IconLogo from './icon/IconLogo.svelte';
	import IconNetwork from './icon/IconNetwork.svelte';
</script>

<div
	class="font-jersey border-secondary text-highlight bg-primary relative grid min-h-[120px] place-items-center rounded border-4 p-2 text-4xl md:text-6xl"
>
	<div class="absolute top-2 left-2 w-6 animate-pulse">
		<IconBattery />
	</div>
	<div class="absolute top-2 right-2 w-6">
		<IconNetwork />
	</div>

	<div class="absolute bottom-0 left-2 hidden md:flex">
		<span class="animate-pulse text-xs tracking-wide select-none">
			creative spaces in amsterdam
		</span>
	</div>

	<p class="text-secondary">Waterhouse Studios</p>
</div>

<style>
	.screen {
		-webkit-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		-moz-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
	}
</style>
