<script lang="ts">
	import IconBattery from './icon/IconBattery.svelte';
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
	class="screen font-jersey relative grid min-h-20 place-items-center rounded border-2 border-teal-950 bg-teal-100 p-2 text-4xl text-teal-500"
>
	<div class="absolute top-2 left-2 w-6 animate-pulse">
		<IconBattery />
	</div>
	<div class="absolute top-2 right-2 w-6">
		<IconNetwork />
	</div>
	<div class="absolute bottom-0 left-2 w-full">
		<span class="animate-pulse text-xs tracking-wide"> {formattedDate} </span>
	</div>
	<p>Waterhouse Studios</p>
</div>

<style>
	.screen {
		-webkit-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		-moz-box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
		box-shadow: 0px 0px 92px 0px rgba(45, 255, 196, 0.49);
	}
</style>
