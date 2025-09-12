<script lang="ts">
	import { onMount } from 'svelte';

	const URL = 'https://www.twitch.tv/waterhousestudios';

	onMount(() => {
		window.location.href = URL;
	});
</script>

<svelte:head>
	<title>Redirecting to Google Reviews...</title>
	<meta http-equiv="refresh" content="0; url={URL}" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-black text-white">
	<div class="text-center">
		<h1 class="mb-4 text-2xl">Redirecting to Google Reviews...</h1>
		<p class="mb-4 text-gray-400">If you are not redirected automatically,</p>
		<a href={URL} class="text-blue-400 hover:underline"> click here to leave a review </a>
	</div>
</main>
