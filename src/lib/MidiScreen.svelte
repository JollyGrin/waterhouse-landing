<script lang="ts">
	import IconBattery from './icon/IconBattery.svelte';
	import IconLogo from './icon/IconLogo.svelte';
	import IconNetwork from './icon/IconNetwork.svelte';

	const date = new Date();
	const formattedDate = date.toLocaleString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	});
</script>

<div
	class="font-jersey border-secondary text-highlight bg-primary relative grid min-h-34 place-items-center rounded border-4 p-2 text-4xl"
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
	<div class="absolute right-2 bottom-0">
		<span class="text-xs tracking-wide select-none"> {formattedDate} </span>
	</div>
	<div class="text-secondary absolute top-4 hidden w-16 md:block">
		<IconLogo />
	</div>
	<p class="text-secondary md:mt-6">Waterhouse Studios</p>
</div>

<style>
	.screen {
		-webkit-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		-moz-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
	}
</style>
