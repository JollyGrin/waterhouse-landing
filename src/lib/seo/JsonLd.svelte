<script lang="ts">
	// Renders a JSON-LD structured-data block into <head>. `<` is escaped so page
	// content can never break out of the <script> element.
	let { schema }: { schema: unknown } = $props();
	const json = JSON.stringify(schema).replace(/</g, '\\u003c');
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}<\/script>`}
</svelte:head>
