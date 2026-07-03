<script lang="ts">
	import { page } from '$app/state';
	import { SITE } from '$lib/site';

	// Per-page SEO head. Renders a unique title, description, canonical URL, and
	// Open Graph / Twitter card tags. Canonical is derived from the current path
	// so it is always self-referencing and correct.
	let {
		title,
		description = SITE.description,
		image = SITE.ogImage,
		type = 'website',
		noindex = false
	}: {
		title: string;
		description?: string;
		image?: string;
		type?: string;
		noindex?: boolean;
	} = $props();

	// Full title: brand suffix on every page except where already present.
	const fullTitle = $derived(
		title.includes(SITE.name) ? title : `${title} | ${SITE.name}`
	);
	const canonical = $derived(`${SITE.url}${page.url.pathname}`);
	const absoluteImage = $derived(image.startsWith('http') ? image : `${SITE.url}${image}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={absoluteImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />
</svelte:head>
