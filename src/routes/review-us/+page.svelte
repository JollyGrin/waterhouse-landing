<script lang="ts">
	import { onMount } from 'svelte';
	
	const GOOGLE_REVIEW_LINK = 'https://g.page/r/CX-2DOpGDJ9YEAE/review';
	
	onMount(() => {
		window.location.href = GOOGLE_REVIEW_LINK;
	});
</script>

<svelte:head>
	<title>Redirecting to Google Reviews...</title>
	<meta http-equiv="refresh" content="0; url={GOOGLE_REVIEW_LINK}">
</svelte:head>

<main class="min-h-screen bg-black text-white flex items-center justify-center">
	<div class="text-center">
		<h1 class="text-2xl mb-4">Redirecting to Google Reviews...</h1>
		<p class="text-gray-400 mb-4">If you are not redirected automatically,</p>
		<a href={GOOGLE_REVIEW_LINK} class="text-blue-400 hover:underline">
			click here to leave a review
		</a>
	</div>
</main>