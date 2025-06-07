<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	let { children } = $props();
	const siteTitle = "Waterhouse Studios";
	const siteDescription = "Premium music studios and creative spaces for music creators and industry professionals";
	const siteUrl = "https://waterhouse.studio";
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={siteDescription} />
	<meta name="robots" content="index, follow" />
</svelte:head>

<Toaster />
{@render children()}
