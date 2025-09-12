<script lang="ts">
	import { onMount } from 'svelte';

	const TWITCH_CHAT = 'https://www.twitch.tv/popout/waterhousestudios/chat?popout=';

	onMount(() => {
		window.location.href = TWITCH_CHAT;
	});
</script>

<svelte:head>
	<title>Redirecting to Google Reviews...</title>
	<meta http-equiv="refresh" content="0; url={TWITCH_CHAT}" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-black text-white">
	<div class="text-center">
		<h1 class="mb-4 text-2xl">Redirecting to Google Reviews...</h1>
		<p class="mb-4 text-gray-400">If you are not redirected automatically,</p>
		<a href={TWITCH_CHAT} class="text-blue-400 hover:underline"> click here to leave a review </a>
	</div>
</main>
